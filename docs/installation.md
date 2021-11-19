---
title: Setting up the CryptoMañana Framework (CryptoManana Docs)
description: Installation and configuration of the CryptoMañana Framework.
redirect_from:
  - /en/docs/installation/
  - /en/docs/installation
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Installation and Setup
    url: /docs/installation
navigation:
  previous:
    title: Previous
    url: /docs/
  next:
    title: Next
    url: /docs/cryptography-model
---

{% include breadcrumbs.html %}

### [](#installation-and-setup){:.book_mark}Installation and Setup ###

&nbsp;&nbsp;&nbsp;&nbsp;The **CryptoMañana (CryptoManana) cryptography framework** is easy to install and configure. The
framework does not require any third-party dependencies or extensions for production usage. The following sections give
more detailed information about the framework installation and requirements.

### [](#system-requirements){:.book_mark}System Requirements ###

&nbsp;&nbsp;&nbsp;&nbsp;To use the CryptoManana framework, you must have a PHP version between 5.5 and 8.0 with the
default built-in set of extensions. Note that some operating systems may come with faulty a compilation of PHP or with
some extensions disabled via configuration. For example, a lot of Unix unmaintained distributions sometimes forget to
compile the 'libsodium'/'
sodium' extensions or even built extensions that are with 4 years older version than the current PHP. This happens a lot
in the CentOS universe, Vagrant images or in some CI/CD build images that are recompiled daily or weekly. In most
Windows or macOS based machines, the provided project may have disabled extensions in the 'php.ini' that should be by
default enabled, so please check the configuration before you run any project.

&nbsp;&nbsp;&nbsp;&nbsp;Do not forget to look both at your CLI and Web configuration files. Most official Docker images
come pre-configured as they should, but sometimes certain extensions are faulty because of the chosen distribution or
operating system library version. The framework is developed to correctly support all algorithms under both x86 and 64x
machines. In addition, it correctly processed Unicode information, but keep in mind that older versions of PHP require
the extra extension 'mbstring' to fully support that.

&nbsp;&nbsp;&nbsp;&nbsp;The minimum system specification would require:

- The minimum RAM to run PHP;
- x86 or 64x system architecture;
- ASCII or Unicode encoding support;
- A `PHP` version 5.5, 5.6, 7.0, 7.1, 7.2, 7.3, 7.4 or 8.0;
- The `spl` extension (bundles with PHP >= 5.0.0, added to core since PHP >= 5.3.0);
- The `hash` extension (bundled with PHP >= 5.1.2, added to core since PHP >= 7.4.0);
- The `openssl` extension (added by default for PHP >= 5.0.0, needs the OpenSSL Library);
- The `OpenSSL Library` installed by default with many Operating Systems and LAMP servers;

&nbsp;&nbsp;&nbsp;&nbsp;The optional requirements include:

- The `libsodium` or`sodium` extension for Argon2 support (bundles with PHP >= 7.2.0);
- The `mbstring` extension if you want to use other encodings (most modern frameworks use it);
- The `zend-opcache` extension for code caching and JIT support (bundled with PHP >= 5.5.0);
- The `apcu` extension for in-memory key-value storage or an autoloading cache implementation.

&nbsp;&nbsp;&nbsp;&nbsp;The suggested dependencies or tools are:

- The `Composer Dependency Manager` for the package installation;
- The `event` extension if your system uses the `libevent` library.

### [](#framework-installation-methods){:.book_mark}Framework Installation Methods ###

&nbsp;&nbsp;&nbsp;&nbsp;There are two supported methods for the framework's installation that are described in the next
sections.

#### [](#composer-installation-recommended){:.book_mark}Composer Installation (Recommended) ####

&nbsp;&nbsp;&nbsp;&nbsp;To integrate the CryptoManana framework in your project via the Composer Dependency Manager,
just require the package from [Packagist](https://packagist.org/packages/karavasilev/cryptomanana){: target="_blank"} as
follows:

{% include code_copy_header.html %}

```bash
# Install the package at your project via Composer
composer require karavasilev/cryptomanana
```

*Note: The best practices suggest that you should specify a version like `1.*` or `^1.0`, but this is entirely up to
your taste.*

&nbsp;&nbsp;&nbsp;&nbsp;As an optional procedure, if you are not entirely sure that the system is supported or
configured correctly, you can call the preinstalled system checker script to scan for problems and give you suggestions:

{% include code_copy_header.html %}

```bash
# Optionally, check if your system is well-configured
php vendor/karavasilev/cryptomanana/check.php
```

*Note: This check script can flag certain missing system requirements or wrongly configured extensions, for example,
the `OPENSSL_CONF` environmental variable may not be pointing to the `openssl.cnf` file or your PHP version may need an
upgrade.*

#### [](#manual-autoloading-legacy){:.book_mark}Manual Autoloading (Legacy) ####

&nbsp;&nbsp;&nbsp;&nbsp;If you in to integrate the framework in a legacy project that does not use require and utilizes
manual autoloading, then you must either integrate it manually via the `src/autoloader.php` autoloader or you own one,
as follows:

{% include code_copy_header.html %}

```bash
# Download the project
wget https://github.com/TonyKaravasilev/CryptoManana/archive/master.zip

# Decompress the archive
unzip master.zip
cd CryptoManana-master

# if your project is at '/home/tony/project', then copy the framework
# source code inside a separate folder, for example 'dependencies'
mkdir –p /home/tony/project/dependencies
cp –r src/ /home/tony/project/dependencies/cryptomanana
```

&nbsp;&nbsp;&nbsp;&nbsp;If your project's entry point or autoloading point is at */home/tony/project/public/index.php*,
then add the following at the beginning of your autoloading code:

{% include code_copy_header.html %}

```php
// Somewhere where you do your autoloading
require '../dependencies/cryptomanana/autoloader.php';
```

*Note: The place, way or autoloading technique depends entirely on your project's codebase, but make sure you are
correctly loading the `CryptoManana` namespace.*

### [](#advanced-configuration-tuning){:.book_mark}Advanced Configuration Tuning ###

&nbsp;&nbsp;&nbsp;&nbsp;There are more advanced configuration options supported by the framework, which will likely not
be used by most developers. The next sections will explain them in detail and specify a usual use case example.

#### [](#backward-compatibility-polyfill){:.book_mark}Backward Compatibility Polyfill ####

&nbsp;&nbsp;&nbsp;&nbsp;By default, the CryptoManana Framework provides compatibility for different older PHP versions
(polyfill script). If you would like to write your own logic or use another package for the polyfill logic, for example
the famous [Symfony Polyfill](https://github.com/symfony/polyfill){: target="_blank" } package, then you can disable the
compatibility check (located at `src/compatibility.php`) via a global constant definition
for `CRYPTO_MANANA_COMPATIBILITY_OFF`. The global constant must be defined before autoloading or before the first class
usage (object call/access), as follows:

{% include code_copy_header.html %}

```php
define('CRYPTO_MANANA_COMPATIBILITY_OFF', true);
// or -> const CRYPTO_MANANA_COMPATIBILITY_OFF = 1;
```

*Note: In most cases, you should not need to do this. It will not affect your performance in any way because the
built-in polyfill script is called only once per HTTP request (or CLI execution). To avoid conflicts with multiple
polyfill scripts, ensure the inclusion order is correct.*

#### [](#support-various-encodings){:.book_mark}Support Various Encodings ####

&nbsp;&nbsp;&nbsp;&nbsp;The newest version of PHP support by default UTF-8 and ASCII processing at the function level.
This was not always the case at older versions or for all available internal functions. In addition, your application
may need to support another type of encoding instead, like 'Windows-1251'. It is important to say that the HTTP
protocol (at the moment) does not support any encoding bigger than UTF-8 for visualization. Still, in some cases you may
be required to write a CLI script that connects to a database in a UTF-16 based collation for processing, then you would
need to process those strings accurately. Because of this, a lot of the existing web frameworks have added
the [`mbstring`](https://www.php.net/manual/en/book.mbstring.php) extension as a requirement for their installation.
This extension is not built-in and may cause a lot of performance issues, but because of the functionality it provides,
a lot of distributions bundle it to their PHP distribution package by default.

&nbsp;&nbsp;&nbsp;&nbsp;The CryptoManana framework does not require
the [`mbstring`](https://www.php.net/manual/en/book.mbstring.php) extension. If you install it on your platform, then
you can tell the framework to utilize it for all the internal string processing features. To configure this, you must do
something like this in your project's entry point:

{% include code_copy_header.html %}

```php
// Autoload packages via Composer class autoloader
require 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

// Configure PHP internal encoding (default is `UTF-8` for PHP >= 5.6)
ini_set('default_charset', 'UTF-8');

// Configure `mbstring` to use your favourite UTF-8 encoding
mb_regex_encoding('UTF-8');
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// Enable the `mbstring` support for CryptoManana components
CryptoManana\Core\StringBuilder::useMbString(true);

// Start coding hard...
```

*Note: The framework works without the extension and does not enable the usage of it by default for performance
reasons.*

#### [](#framework-integration-tips){:.book_mark}Framework Integration Tips ####

&nbsp;&nbsp;&nbsp;&nbsp;When integrating the components inside your project's framework, there are many approaches that
you can choose and it is all up to you (your taste, style and imagination), for example, you can:

- Use the components as services in your controllers or scripts;
- Add components to your global dependency injection container;
- Bootstrap components inside your framework's core;
- Add them as facades that reflect your services;
- Use them as simple utilities for processing;
- Define helper or support security objects;
- Extend and define new features;
- Others use cases.

{% include section_navigation_buttons.html %}
