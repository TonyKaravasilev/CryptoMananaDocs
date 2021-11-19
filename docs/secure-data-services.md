---
title: Secure Data Services (CryptoManana Docs)
description: Secure Data Services.
redirect_from:
  - /en/docs/secure-data-services/
  - /en/docs/secure-data-services
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Secure Data Services
    url: /docs/secure-data-services
navigation:
  previous:
    title: Previous
    url: /docs/cryptographic-services
  next:
    title: Next
    url: /docs/exceptions
---

{% include breadcrumbs.html %}

### [](#cryptographic-data-services){:.book_mark}Cryptographic Data Services ###

&nbsp;&nbsp;&nbsp;&nbsp;Secure data services are special cryptographic services that entirely depend on randomness
sources and are used for the realizations of data generation, manipulation and deletion operations. They are needed for
the secure creation of cryptographic configurations, shuffling processes and disk deletion. In practice, they are of big
help for the developer, because they support other cryptographic primitives and indirectly other protocols or services.
To reduce the complexity of their behavior, we can classify them as utility components that help the proper functioning
of primitives/services, but also as standardized methods for data operations (deletion/manipulation, etc.).

&nbsp;&nbsp;&nbsp;&nbsp;The **CryptoMañana (CryptoManana) cryptography framework** provides object-oriented components
for the realization of each most used data operation. The supported algorithm/standard realizations at the
[`\CryptoManana\Utilities`](../api/namespaces/CryptoManana.Utilities.html "services"){:target="_blank"} namespace are:

- `TokenGenerator` Utility class for cryptography token generation;
- `DataShuffler` - Utility class for secure data shuffling;
- `ElementPicker` - Utility class for random element picking;
- `FileShredder` - Utility class for secure file shredding;

&nbsp;&nbsp;&nbsp;&nbsp;Note that, at the current moment, this type of component does not need a data structure for its
input or output. Depending on the different future services, this may change, but for the moment there are no special
formats supported here.

### [](#the-randomness-source){:.book_mark}The Randomness Source ###

&nbsp;&nbsp;&nbsp;&nbsp;Every component of this type has one mandatory dependency that is a data generator primitive. By
default, the randomness source by default is the most secure available via the `\CryptoManana\Randomness\CryptoRandom`
primitive, but it can be changed via the `setRandomGenerator()` method. Here is a list of all available methods
available:

```php
setRandomGenerator() // set the randomness source
getRandomGenerator() // get the randomness source
seedRandomGenerator() // pass a seed value to the generator
```

&nbsp;&nbsp;&nbsp;&nbsp;It is important to note, that the `CryptoRandom` generator does not support controllable
seeding, but the method `seedRandomGenerator()` can be called from time to time without a parameter to introduce extra
entropy pool requests with to create more randomness. Of course, if you use one of the other data generators, seeding is
fully functional.

### [](#token-generator-service){:.book_mark}Token Generator Service ###

&nbsp;&nbsp;&nbsp;&nbsp;As you should have already noticed, we have previously used this component for the generation of
asymmetric key pairs, but we have yet not explained the full potential of this service. Its purpose is to support the
developer's need to generate different types of cryptographic configurations, but also secure tokens (device, web,
session, etc.). Here is a list of all available methods for this component:

```php
getTokenString() // generate a secure token
getPasswordString() // generate a user password
getHashingKey() // generate a hash function key
getHashingSalt() // generate a cryptographic salt
getEncryptionKey() // generate symmetric secret key
getEncryptionInitializationVector() // generate an IV
getAsymmetricKeyPair() // generate a asymmetric key pair
```

*Note: Because each of the above methods has multiple parameters, please look them up
at [the technical documentation](../api/classes/CryptoManana.Utilities.TokenGenerator.html){:target="_blank"} page.*

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has multiple public constants available:

```php
/**
 * The paranoid-enough password character length requirement.
 */
const PARANOID_PASSWORD_LENGTH = 40;

/**
 * The strong password character length requirement.
 */
const STRONG_PASSWORD_LENGTH = 20;

/**
 * The moderate password character length requirement.
 */
const MODERATE_PASSWORD_LENGTH = 12;

/**
 * The weak password character length requirement.
 */
const WEAK_PASSWORD_LENGTH = 8;

/**
 * The paranoid-enough token character length requirement.
 */
const PARANOID_TOKEN_LENGTH = 128;

/**
 * The strong token character length requirement.
 */
const STRONG_TOKEN_LENGTH = 64;

/**
 * The moderate token character length requirement.
 */
const MODERATE_TOKEN_LENGTH = 32;

/**
 * The weak token character length requirement.
 */
const WEAK_TOKEN_LENGTH = 16;

/**
 * The hash digestion key 128-bit size.
 */
const DIGESTION_KEY_128_BITS = 16;

/**
 * The hash digestion key 160-bit size.
 */
const DIGESTION_KEY_160_BITS = 20;

/**
 * The hash digestion key 224-bit size.
 */
const DIGESTION_KEY_224_BITS = 28;

/**
 * The hash digestion key 256-bit size.
 */
const DIGESTION_KEY_256_BITS = 32;

/**
 * The hash digestion key 320-bit size.
 */
const DIGESTION_KEY_320_BITS = 40;

/**
 * The hash digestion key 384-bit size.
 */
const DIGESTION_KEY_384_BITS = 48;

/**
 * The hash digestion key 512-bit size.
 */
const DIGESTION_KEY_512_BITS = 64;

/**
 * The hash digestion salt 128-bit size.
 */
const DIGESTION_SALT_128_BITS = 16;

/**
 * The hash digestion salt 160-bit size.
 */
const DIGESTION_SALT_160_BITS = 20;

/**
 * The hash digestion salt 224-bit size.
 */
const DIGESTION_SALT_224_BITS = 28;

/**
 * The hash digestion salt 256-bit size.
 */
const DIGESTION_SALT_256_BITS = 32;

/**
 * The hash digestion salt 320-bit size.
 */
const DIGESTION_SALT_320_BITS = 40;

/**
 * The hash digestion salt 384-bit size.
 */
const DIGESTION_SALT_384_BITS = 48;

/**
 * The hash digestion salt 512-bit size.
 */
const DIGESTION_SALT_512_BITS = 64;

/**
 * The symmetric secret key 128-bit size.
 */
const SECRET_KEY_128_BITS = 16;

/**
 * The symmetric secret key 192-bit size.
 */
const SECRET_KEY_192_BITS = 24;

/**
 * The symmetric secret key 256-bit size.
 */
const SECRET_KEY_256_BITS = 32;

/**
 * The symmetric initialization vector (IV) 128-bit size.
 */
const IV_128_BITS = 16;

/**
 * The symmetric initialization vector (IV) 192-bit size.
 */
const IV_192_BITS = 24;

/**
 * The symmetric initialization vector (IV) 256-bit size.
 */
const IV_256_BITS = 32;

/**
 * The RSA key pair type.
 */
const RSA_KEY_PAIR_TYPE = OPENSSL_KEYTYPE_RSA;

/**
 * The DSA/DSS key pair type.
 */
const DSA_KEY_PAIR_TYPE = OPENSSL_KEYTYPE_DSA;

/**
 * The asymmetric key pair 1024-bit size.
 */
const KEY_PAIR_1024_BITS = 1024;

/**
 * The asymmetric key pair 2048-bit size.
 */
const KEY_PAIR_2048_BITS = 2048;

/**
 * The asymmetric key pair 3072-bit size.
 */
const KEY_PAIR_3072_BITS = 3072;

/**
 * The asymmetric key pair 4096-bit size.
 */
const KEY_PAIR_4096_BITS = 4096;
```

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for the usage of this type of secure data service component:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\TokenGenerator;
use CryptoManana\Randomness\CryptoRandom;
use CryptoManana\Randomness\PseudoRandom;

$generator = new TokenGenerator();

if (!$generator->getRandomGenerator() instanceof CryptoRandom) {
    throw new \Exception('Wrong default randomness source!');
}

echo 'Token: ' . $generator->getTokenString(
        $generator::WEAK_TOKEN_LENGTH
    ) . '<br>';
echo 'Password: ' . $generator->getPasswordString(
        $generator::STRONG_PASSWORD_LENGTH
    ) . '<br>';

// Consume secure entropy pool
$generator->seedRandomGenerator();

echo 'Hashing Key: ' . $generator->getHashingKey(
        $generator::DIGESTION_KEY_128_BITS
    ) . '<br>';
echo 'Hashing Salt: ' . $generator->getHashingKey(
        $generator::DIGESTION_SALT_128_BITS
    ) . '<br>';

// Change the default generator with a controllable one
$generator->setRandomGenerator(new PseudoRandom())
    ->seedRandomGenerator(1024);

echo 'Encryption Key: ' . $generator->getEncryptionKey(
        $generator::SECRET_KEY_192_BITS
    ) . '<br>';
echo 'Encryption IV: ' . $generator->getEncryptionInitializationVector(
        $generator::IV_192_BITS
    ) . '<br>';

echo 'Reseed and generate again -> ' . '<br>';
$generator->seedRandomGenerator(1024);

echo 'Encryption Key (the same): ' . $generator->getEncryptionKey(
        $generator::SECRET_KEY_192_BITS
    ) . '<br>';
echo 'Encryption IV(the same): ' . $generator->getEncryptionInitializationVector(
        $generator::IV_192_BITS
    ) . '<br>';

// Seeding is not effecting the asymmetric pair generation for security reasons
$keyPairOne = $generator->getAsymmetricKeyPair(
    $generator::KEY_PAIR_1024_BITS,
    $generator::RSA_KEY_PAIR_TYPE
);

$keyPairTwo = $generator->getAsymmetricKeyPair(
    $generator::KEY_PAIR_1024_BITS,
    $generator::DSA_KEY_PAIR_TYPE
);

echo 'RSA key pair => ' . $keyPairOne . '<br>';
echo 'DSA key pair => ' . $keyPairTwo . '<br>';
```

### [](#data-shuffle-service){:.book_mark}Data Shuffle Service ###

&nbsp;&nbsp;&nbsp;&nbsp;The data shuffle service provides a secure way to secure shuffle or information smudge string
and array values. Its purpose is to support the developer's need to shuffle lists or do data obfuscation procedures.
Here is a list of all available methods for this component:

```php
shuffleString() // shuffle a string
shuffleArray() // shuffle an array
```

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for the usage of this type of secure data service component:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\DataShuffler;

$testString = 'Long string for testing in here!   #ThisIsNaughty';
$testArray = ['1', [3, 2], new \stdClass(), 33, 'test', [], '1', 69];

$shuffler = new DataShuffler();

echo 'Original String: ' . $testString . '<br>';
echo 'Original Array: ' . var_export($testArray) . '<br>';

// Shuffling
$string = $shuffler->shuffleString($testString);
$array = $shuffler->shuffleArray($testArray);

echo 'Shuffled String: ' . $string . '<br>';
echo 'Shuffled Array: ' . var_export($array) . '<br>';

// Data mocking example
$shuffler->seedRandomGenerator();
$length = strlen($testString);

$testString .= $shuffler->getRandomGenerator()
    ->getAlphaNumeric($length * 10, true);

$string = substr($shuffler->shuffleString($testString), 0, $length);
echo 'Masked String: ' . $string . '<br>';
```

### [](#element-picker-service){:.book_mark}Element Picker Service ###

&nbsp;&nbsp;&nbsp;&nbsp;The element picker service provides a secure way to draw values or smudge string and array
values. Its purpose is to support the developer's need to pick elements from lists or do data obfuscation procedures.
Here is a list of all available methods for this component:

```php
pickCharacterElement() // fetch character
pickArrayElement() // fetch element
```

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for the usage of this type of secure data service component:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\ElementPicker;

$testString = 'Long string for testing in here!   #ThisIsNaughty';
$testArray = ['1', [3, 2], new \stdClass(), 33, 'test', [], '1', 69];

$picker = new ElementPicker();

echo 'Original String: ' . $testString . '<br>';
echo 'Original Array: ' . var_export($testArray) . '<br>';

// Shuffling
$character = $picker->pickCharacterElement($testString);
$element = $picker->pickArrayElement($testArray);

echo 'Picked Character: ' . $character . '<br>';
echo 'Picked Element: ' . var_export($element) . '<br>';

// Data mocking example
$picker->seedRandomGenerator();
$randomCharacters = $picker->getRandomGenerator()->getAlphaNumeric(20);

$bannedWord = 'Naughty';
$randomWord = '';

for ($i = 0; $i < strlen($bannedWord); $i++) {
    $randomWord .= $picker->pickCharacterElement($randomCharacters);
}
// or: $picker->getRandomGenerator()->getAlphaNumeric(strlen($bannedWord));

$string = str_replace($bannedWord, $randomWord, $testString);
echo 'Masked Word: ' . $string . '<br>';
```

### [](#file-shredder-service){:.book_mark}File Shredder Service ###

&nbsp;&nbsp;&nbsp;&nbsp;The file shredder service provides the secure deletion or erasure of a file from a modern
filesystem. Its purpose is to support the developer's need to enforce confidentiality and meet data regulations
requirements. The supported file shredder meets the three-pass secure deletion at
the [DoD 5220.22-M](https://en.wikipedia.org/wiki/National_Industrial_Security_Program){:target="_blank"} specification.
The passes include writing only zeros, only ones and pseudo-randomly generation values before marking the file as
deleted. Here is a list of all available methods for this component:

```php
eraseFile() // secure erase a file by filename
```

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for the usage of this type of secure data service component:

{% include code_copy_header.html %}

```php
use CryptoManana\Utilities\FileShredder;

$path = trim(sys_get_temp_dir()) ?: (string)ini_get('upload_tmp_dir');
$fileName = $path . DIRECTORY_SEPARATOR . 'for-deletion.tmp';

$shredder = new FileShredder();

// populate a testing file
file_put_contents($fileName, $shredder->getRandomGenerator()->getBase64(10));

echo 'File Location: ' . $fileName . '<br>';
echo 'File Content: ' . file_get_contents($fileName) . '<br>';

// Secure rename
$renamedFilename = $path . DIRECTORY_SEPARATOR;
$renamedFilename .= $shredder->getRandomGenerator()->getHex(16) . '.tmp';
rename($fileName, $renamedFilename);
$fileName = $renamedFilename;

echo 'New File Name: ' . $fileName . '<br>';

// Secure delete the file
$shredder->eraseFile($fileName);

clearstatcache(true, $fileName);

echo 'Result: ';
echo !file_exists($fileName) ? 'File is securely deleted!' : 'Error!';

// Testing file cleanup, not needed
@unlink($fileName);
```

{% include section_navigation_buttons.html %}
