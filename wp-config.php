<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp313');

/** MySQL database username */
define('DB_USER', 'wp313');

/** MySQL database password */
define('DB_PASSWORD', '47Se-1m@RP');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'cbjgx3hwy7vmzbgec8ccc2udzkaoksybntcmlvwndfyvaj3cirluald1smexz1ns');
define('SECURE_AUTH_KEY',  'krcfgwedfphapmzjwx7ei1eipkock1hhkucv0jhmcvnlgw5v8jwcjaq3lehwntrd');
define('LOGGED_IN_KEY',    '6zgystnhfqv41mtiab2xzjcub5lzibmkcol6wwpb8mkc0gdfvp7wufmluqk22yc1');
define('NONCE_KEY',        'wcgocnlacrmloqxm3iqk3dbxq0dq6zubdvqcwlkkdzv4wdnkm9vatafylydwcn9l');
define('AUTH_SALT',        'porty5a2dd1ojt5e0kzhtwljlztmtxauvfn9belqplxwvdn07fqjgarywm2vwqln');
define('SECURE_AUTH_SALT', 'apyqbamgxbdbiuesjhagwlhk7vfotreojz1gog1fboie6ug6stmf05t51su1oind');
define('LOGGED_IN_SALT',   'wuflnaxxerjreiapv42oloovfr3hggdvv1gzwwmjtfewyunh9rckgnamff8pnwtf');
define('NONCE_SALT',       'gdjcyzt1j45rvpkvqm4i7d8yiroimrchwqo2ut9ksvuj6hhil1it78gxzgqoohds');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
