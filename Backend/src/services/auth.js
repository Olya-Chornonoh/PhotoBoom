// Dependency to sign and check JSON Web Tokens.
const jwt = require('jsonwebtoken');

// Dependency to store passwords in database
const bcrypt = require('bcrypt');

const {Unauthorized, NotFound} = require('http-errors');

const config = require('../config');
const User = require('../model/user');

class AuthService {
  constructor() {
    this.secret = config.jwt.secret;
    this.issuer = config.jwt.issuer;
  }

  /**
   * Function for basic user sign in (email + password).
   *
   * If user with supplied email was found and password was valid, will resolve
   * with access token, generated from user id.
   * If email was not found or password not valid, will reject.
   *
   * @param {{email: string, password: string}} request sign in request
   * @param {number | string} [expiresIn] expiration time span
   * @return {Promise<{token: string, refresh: string}>}
   */
  async signIn(request, expiresIn) {
    // find user by email first
    const user = await User.findOne({
      where: {email: request.email},
    });

    // user with specified email was not found
    if (!user) throw new NotFound('User not found');

    // user was found
    // continue comparing password
    const same =
        await bcrypt.compare(request.password, String(user.get('passwd')));

    if (same) {
      const token = this.sign({user_id: String(user.get('id'))}, expiresIn);
      const refresh = await this.hash(String(user.get('id')));

      // resolve with token, generated from user id from database
      // and with refresh token
      return {token, refresh};
    } else {
      throw new Unauthorized('Unauthorized');
    }
  }

  /**
   * Function to sign data into JWT token.
   *
   * Returns generated token. By default, expiration time of the token is set to
   * 1 hour.
   *
   * @param {{user_id: string}} payload useful payload to sign
   * @param {number | string} [expiresIn] describes a time span
   * @return {string}
   */
  sign(payload, expiresIn = '1d') {
    // check payload
    if (!payload.user_id || typeof payload.user_id !== 'string') {
      throw new InvalidValueError('Invalid payload');
    }

    // Actually sign payload
    return jwt.sign(payload, this.secret, {
      issuer: this.issuer,
      expiresIn,
    });
  }

  /**
   * Function to validate incoming JWT tokens.
   *
   * If token is valid, function will return decoded token.
   * If token is invalid, function will throw an error instead of returning.
   *
   * @param {string} token incoming JWT token
   * @return {string | object}
   */
  verify(token) {
    return jwt.verify(token, this.secret, {
      issuer: this.issuer,
    });
  }

  /**
   * Function to refresh expired token, based on refresh token.
   *
   * @param {{token: string, refresh: string}} request refresh request
   * @param {string} [expiresIn] expiration time span
   * @return {Promise<{token: string, refresh: string}>}
   */
  async refresh(request, expiresIn = '1d') {
    // unsafely decode incoming token
    const decoded = jwt.decode(request.token);

    // check refresh token
    if (decoded && decoded['user_id']) {
      const same = await bcrypt.compare(
          this.toHash(decoded['user_id']), request.refresh);

      if (same) {
        const newToken = this.sign({user_id: decoded['user_id']}, expiresIn);

        return {token: newToken, refresh: request.refresh};
      } else {
        throw new Unauthorized('Invalid refresh token');
      }
    } else {
      throw new Unauthorized('Invalid token');
    }
  }

  /**
   * Function to generate refresh tokens from user id, server secret and issuer.
   * @param {string} userId user id from database
   * @return {Promise<string>}
   */
  hash(userId) {
    return bcrypt.hash(this.toHash(userId), 10);
  }

  /**
   * Helper function to generate to hash string from userId.
   * @param {string} userId user id
   * @return {string}
   */
  toHash(userId) {
    return `${userId}|${this.secret}|${this.issuer}`;
  }
}

module.exports = AuthService;
