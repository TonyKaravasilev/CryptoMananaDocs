---
title: Common Use Cases (CryptoManana Docs)
description: Common Use Cases Examples.
redirect_from:
  - /en/docs/use-case-examples/
  - /en/docs/use-case-examples
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Common Use Cases
    url: /docs/use-case-examples
navigation:
  previous:
    title: Previous
    url: /docs/model-extension-examples
  next:
    title: Next
    url: /docs/miscellaneous-examples
---

{% include breadcrumbs.html %}

### [](#encrypting-passwords){:.book_mark}Encrypting Passwords ###

&nbsp;&nbsp;&nbsp;&nbsp;Almost every project has a need to store user or device passwords. This can be achieved via the
supported HMAC, PBKDF2, Bcrypt or Argon2 algorithms depending on the project's requirements. Please do not reuse keys or
salt string for your users. In addition, make sure the generation and verification process do not provide any
time-attacks or brute-force attacks. Here is a simple example using the Bcrypt algorithm that has its own salting in the
digest but with a second custom salt:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\TokenGenerator;
use CryptoManana\Hashing\Bcrypt;

// 0. Set strong password policy
const USER_PASSWORD = ' pass1$X!Da';

// 1. Register or password change
$hasher = new Bcrypt();
$generator = new TokenGenerator();

// Generate a strong salt per every user
$secondSalt = $generator->getHashingSalt(
    $generator::DIGESTION_SALT_512_BITS
);

// Note that Bcrypt has auto salting in the digest
$hasher->setSalt($secondSalt);

// Set the format modes
$hasher->setDigestFormat($hasher::DIGEST_OUTPUT_HEX_UPPER)
    ->setSaltingMode($hasher::SALTING_MODE_PALINDROME_MIRRORING);

// Chose a cost that needs at least 50-100 ms for hashing
$hasher->setAlgorithmicCost(12);

// Generate the digest
$digest = $hasher->hashData(trim(USER_PASSWORD));

// Store the digest and the salt inside a database
echo 'Digest: ' . $digest . '<br>';
echo 'Salt: ' . $secondSalt . '<br>';
unset($hasher, $generator);

// 2. Login process
$sentPassword = trim(USER_PASSWORD);

// Fetch from the database
$saltDatabase = $secondSalt; // from the database
$digestDatabase = $digest; // from the database

$hasher = new Bcrypt();

// Note that Bcrypt has auto salting in the digest
$hasher->setSalt($saltDatabase)
    ->setDigestFormat($hasher::DIGEST_OUTPUT_HEX_UPPER)
    ->setSaltingMode($hasher::SALTING_MODE_PALINDROME_MIRRORING)
    ->setAlgorithmicCost(12);

// Verify the password and log in
echo $hasher->verifyHash($sentPassword, $digest) ?
    'The passwords match!' : 'The passwords are not the same!';
```

### [](#encrypting-reusable-information){:.book_mark}Encrypting Reusable Information ###

&nbsp;&nbsp;&nbsp;&nbsp;Most projects have a need for recovering some encrypted data, such as national ID numbers,
photos or credit card numbers. They may be further needed for example to process payments. Again, try not to reuse
cryptographic configurations between projects or even users. Most systems would you some kind of symmetric encryption
layering to achieve that, for instance:

{% include code_copy_header.html %}

```php
use CryptoManana\SymmetricEncryption\Camellia256;
use CryptoManana\SymmetricEncryption\Aes256;
use CryptoManana\Utilities\TokenGenerator;

// 0. Project configuration (layer one) - IN THE CODE BASE
const PROJECT_ENCRYPTION_KEY = 'fxaXXs6f5saf817@!4явр1XSFaslfas_';
const PROJECT_ENCRYPTION_IV = 'xQя1264%5_f@@$1!';

$cam = new Camellia256();

$cam->setSecretKey(PROJECT_ENCRYPTION_KEY) // Camellia256::KEY_SIZE
    ->setInitializationVector(PROJECT_ENCRYPTION_IV) // Camellia256::IV_SIZE
    ->setCipherFormat($cam::ENCRYPTION_OUTPUT_HEX_UPPER)
    ->setBlockOperationMode($cam::CTR_MODE)
    ->setPaddingStandard($cam::PKCS7_PADDING);

// 1. Per user configuration (layer two) - IN THE DATABASE

$generator = new TokenGenerator();
$aes = new Aes256();

// Generate and save at the database for the user when registering
$key = $generator->getEncryptionKey($aes::KEY_SIZE);
$iv = $generator->getEncryptionKey($aes::IV_SIZE);

$aes->setSecretKey($key)
    ->setInitializationVector($iv)
    ->setCipherFormat($aes::ENCRYPTION_OUTPUT_BASE_64_URL)
    ->setBlockOperationMode($aes::CBC_MODE)
    ->setPaddingStandard($aes::PKCS7_PADDING);

// 2. When data comes for insert or update
$data = 'credit card number here';
echo 'Data: ' . $data . '<br>';

// Encrypt with the project configuration
$cipherData = $cam->encryptData($data);
echo 'Cipher Data (Project): ' . $cipherData . '<br>';

// Encrypt with the user configuration and store it at the database
$cipherData = $aes->encryptData($cipherData);
echo 'Cipher Data (User): ' . $cipherData . '<br>';

// 3. When data is needed for reading
// Fetch the cipher text and the user configuration
// Instance again both symmetric systems and decrypt

// Layer 1 (database) - user configuration decryption
$cipherData = $aes->decryptData($cipherData);

// Layer 2 (code base) - project configuration decryption
$plainData = $cam->decryptData($cipherData);

// Use the data for something
echo $data === $plainData ?
    'Data is decrypted successfully' : 'Wrong decryption!';
```

### [](#generating-passwords-or-tokens){:.book_mark}Generating Passwords or Tokens ###

&nbsp;&nbsp;&nbsp;&nbsp;Commonly the end programmer may have to create some CSRF tokens, API access tokens or user
access passwords. This is easy to achieve with the framework's token generator that uses the most secure source
available:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\TokenGenerator;

$generator = new TokenGenerator();

$csrfToken = $generator->getTokenString($generator::STRONG_TOKEN_LENGTH);
$apiToken = $generator->getTokenString($generator::PARANOID_TOKEN_LENGTH);
$userPassword = $generator->getPasswordString($generator::PARANOID_PASSWORD_LENGTH);
$devicePassword = $generator->getPasswordString($generator::STRONG_PASSWORD_LENGTH);
$hashKey = $generator->getHashingKey($generator::DIGESTION_KEY_128_BITS);
$encryptionKey = $generator->getEncryptionKey($generator::SECRET_KEY_192_BITS);
$guid = $generator->getRandomGenerator()->getGloballyUniqueId('crypto');
$uuid = $generator->getRandomGenerator()->getStrongUniqueId('manana');
```

{% include section_navigation_buttons.html %}