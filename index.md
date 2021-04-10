---
title: CryptoMañana Framework
description: The documentation website of the CryptoMañana/CryptoManana cryptography PHP framework.
redirect_from:
  - /en
  - /en/
---

[![CryptoManana Logo](images/CryptoMananaLogo.jpg "CryptoMañana")](https://github.com/TonyKaravasilev/CryptoManana "CryptoManana")
{:.centered_item}

{% include badges.html %}

{% include github_buttons.html %}

{% include facebook_buttons.html %}

[![GitHub Repository](https://img.shields.io/badge/GitHub-URL-red.svg?style=flat-square&logo=github&cacheSeconds=7200)](https://github.com/TonyKaravasilev/CryptoManana "CryptoManana"){: target="_blank" .centered_item}

[:alien:](https://www.linkedin.com/in/tony-karavasilev){: target="_blank" .centered_item}

### [](#project-description){:.book_mark}Project Description ###

&nbsp;&nbsp;&nbsp;&nbsp;CryptoMañana (CryptoManana) is a PHP cryptography framework that provides object-oriented
solutions for boosting your project's security. The code base of the project follows the S.O.L.I.D/KISS/DRY principles
and implements a few popular Software Design Patterns. The software framework provides a fully functional cryptography
model with a vast of cryptography primitives, protocols and services. It is very useful for secure hashing, encryption,
key exchange, data signing, random data generation and even more. CryptoMañana is here to make your development faster
and more secure!

**Website Source: [Documentation Repository](https://github.com/TonyKaravasilev/CryptoMananaDocs "CryptoMananaDocs"){:
target="_blank"}**{: .centered_item}
**Framework Code: [Project Repository](https://github.com/TonyKaravasilev/CryptoManana "CryptoManana"){:target="_blank"
}**{: .centered_item}
**Main Developer: [Tony Karavasilev](https://karavasilev.info "Tony Karavasilev"){:target="_blank"}**{: .centered_item}

### [](#project-requirements){:.book_mark}Project Requirements ###

- `PHP Version`: 5.5, 5.6, 7.0, 7.1, 7.2, 7.3, 7.4 or 8.0;
- The `spl` extension (bundles with PHP >= 5.0.0, added to core since PHP >= 5.3.0);
- The `hash` extension (bundled with PHP >= 5.1.2, added to core since PHP >= 7.4.0);
- The `openssl` extension (added by default for PHP >= 5.0.0, needs the OpenSSL Library);
- The `OpenSSL Library` installed by default with many Operating Systems and LAMP servers;
- The `Composer Dependency Manager` for PHP or manual autoloading via `src/autoload.php`;
- *Optional Extensions:* `libsodium` or`sodium`, `mbstring`, `zend-opcache` and `apcu`.

### [](#project-installation){:.book_mark}Project Installation ###

{% include code_copy_header.html %}

```bash
# Install the package at your project via Composer
composer require karavasilev/cryptomanana

# Optionally, check if your system is well-configured
php vendor/karavasilev/cryptomanana/check.php
```

### [](#project-documentation){:.book_mark}Project Documentation ###

- [The Framework Manual](docs/ "The CryptoManana Manual"){:target="_blank"} *(tutorial with examples)*
- [The Project's API Documentation](api/ "The API Documentation"){:target="_blank"} *(generated via phpDocumentor)*
- [The Tests Agile Documentation](testdox/ "The Tests Agile Documentation"){:target="_blank"} *(generated via PHPUnit)*

### [](#project-citation){:.book_mark}Project Citation ###

> **T. Karavasilev (Т. Каравасилев)**. CryptoMañana Framework. TonyKaravasilev/CryptoManana. {{ site.time | date: "%Y" }}. DOI: 10.5281/zenodo.2604693
