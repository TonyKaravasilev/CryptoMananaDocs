---
title: Cryptography Model Extension (CryptoManana Docs)
description: Cryptography Model Extension Examples.
redirect_from:
  - /en/docs/model-extension-examples/
  - /en/docs/model-extension-examples
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Cryptography Model Extension
    url: /docs/model-extension-examples
navigation:
  previous:
    title: Previous
    url: /docs/core
  next:
    title: Next
    url: /docs/use-case-examples
---

{% include breadcrumbs.html %}

### [](#extending-randomness-sources){:.book_mark}Extending Randomness Sources ###

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple true/false source example for defining new randomness generators via the
cryptography model extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\Randomness\AbstractGenerator;
use CryptoManana\Core\Interfaces\Randomness\SeedableGeneratorInterface;
use CryptoManana\Core\StringBuilder;


class BooleanRandomness extends
    AbstractGenerator implements
    SeedableGeneratorInterface
{
{
    protected static $seed = false;

    public static function setSeed($seed = null)
    {
        $seed = !is_null($seed) ? $seed % 2 : time() % 2;

        // Set the used seed value for history
        self::$seed = $seed;
    }

    public function getMaxNumber()
    {
        return 1;
    }

    public function getMinNumber()
    {
        return 0;
    }

    public function getInt($from = 0, $to = null)
    {
        $from = ($from === null) ? 0 : $from;
        $to = ($to === null) ? $this->getMaxNumber() : $to;

        $this->validateIntegerRange($from, $to);

        $tmp = self::$seed ? 1 : 0;

        self::$seed = self::$seed ? 0 : 1;

        return $tmp;
    }

    public function getBytes($length = 1)
    {
        $this->validatePositiveInteger($length);

        $tmpBytes = '';

        for ($i = 1; $i <= $length; $i++) {
            $tmpBytes .= StringBuilder::getChr($this->getInt());
        }

        return $tmpBytes;
    }

    public function __construct()
    {
        parent::__construct();

        if (self::$seed === false) {
            self::setSeed();
        }
    }
}

$x = new BooleanRandomness();
$x::setSeed(10);

echo $x->getBase64() . '<br>';
echo $x->getBase64() . '<br>';

$x::setSeed(9);
echo $x->getBase64() . '<br>';
echo $x->getBase64() . '<br>';
```

### [](#extending-hash-functions){:.book_mark}Extending Hash Functions ###

&nbsp;&nbsp;&nbsp;&nbsp;Here are a few simple examples for defining new hash functions via the cryptography model
extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\MessageDigestion\{
    AbstractUnkeyedHashFunction,
    AbstractKeyedHashFunction,
    AbstractKeyMaterialDerivationFunction,
    AbstractIterativeSlowDerivation,
    AbstractHardwareResistantDerivation
};

use CryptoManana\Core\Interfaces\MessageDigestion\AlgorithmicCostInterface;
use CryptoManana\Core\Traits\MessageDigestion\AlgorithmicCostTrait;


class Md4 extends AbstractUnkeyedHashFunction
{
    const ALGORITHM_NAME = 'md4';
}

class HmacMd4 extends AbstractKeyedHashFunction
{
    const ALGORITHM_NAME = 'md4';
}

class HkdfMd4 extends AbstractKeyMaterialDerivationFunction
{
    const ALGORITHM_NAME = 'md4';

    const ALGORITHM_MAXIMUM_OUTPUT = 4080; // `16 * 255 = 4080`

    protected $outputLength = 16;
}

class Pbkdf2Md4 extends AbstractIterativeSlowDerivation
{
    const ALGORITHM_NAME = 'md4';

    const ALGORITHM_MAXIMUM_OUTPUT = PHP_INT_MAX;

    protected $outputLength = 16;
}

class BcryptSleepy extends
    AbstractHardwareResistantDerivation implements
    AlgorithmicCostInterface
{
    use AlgorithmicCostTrait;

    const ALGORITHM_NAME = 'bcrypt';

    const ALGORITHM_MAXIMUM_OUTPUT = 72;

    protected $computationalCost = PASSWORD_BCRYPT_DEFAULT_COST;

    protected function fetchAlgorithmVariation()
    {
        return PASSWORD_BCRYPT;
    }

    protected function fetchAlgorithmParameters()
    {
        return [
            'cost' => $this->computationalCost
        ];
    }

    public function hashData($data)
    {
        usleep(mt_rand(1, 5) * 100000);

        return parent::hashData($data);
    }

    public function verifyHash($data, $digest)
    {
        usleep(mt_rand(1, 5) * 100000);

        return parent::verifyHash($data, $digest);
    }
}

$data = 'test';

$md4 = new Md4();
$hmac = new HmacMd4();
$hkdf = new HkdfMd4();
$pbkdf2 = new Pbkdf2Md4();

echo 'MD4: ' . ($md4->hashData($data)) . '<br>';
echo 'HMAC-MD4: ' . ($hmac->hashData($data)) . '<br>';
echo 'HKDF-MD4: ' . ($hkdf->hashData($data)) . '<br>';
echo 'PBKDF-MD4: ' . ($pbkdf2->hashData($data)) . '<br>';

$sleepy = new BcryptSleepy();

echo 'Bcrypt With Sleep: ' . ($sleepy->hashData($data)) . '<br>';
```

### [](#extending-symmetric-ciphers){:.book_mark}Extending Symmetric Ciphers ###

&nbsp;&nbsp;&nbsp;&nbsp;Here are a few simple examples for defining new symmetric systems via the cryptography model
extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\MessageEncryption\AbstractStreamCipherAlgorithm;
use CryptoManana\Core\Abstractions\MessageEncryption\AbstractBlockCipherAlgorithm;

class Rot13 extends AbstractStreamCipherAlgorithm
{
    const ALGORITHM_NAME = 'rot13';

    const KEY_SIZE = 16;

    protected $useNative = false;

    /**
     * Stream cipher algorithm constructor.
     */
    public function __construct()
    {
        if (strlen($this->key) < static::KEY_SIZE) {
            $this->key = str_pad(
                $this->key,
                static::KEY_SIZE,
                "\x0",
                STR_PAD_RIGHT
            );
        }
    }

    public function encryptData($plainData)
    {
        $this->validatePlainDataForEncryption($plainData);

        $plainData = ($plainData === '') ? ' ' : $plainData;

        $plainData = $plainData . strrev($this->key);

        $cipherData = str_rot13($plainData);

        return $this->changeOutputFormat($cipherData, true);
    }

    public function decryptData($cipherData)
    {
        $this->validateCipherDataForDecryption($cipherData);

        $cipherData = $this->changeOutputFormat($cipherData, false);

        $cipherData = str_rot13($cipherData);

        $plainData = substr($cipherData, 0, -strlen($this->key));

        return $plainData;
    }
}

class Des extends AbstractBlockCipherAlgorithm
{
    const ALGORITHM_NAME = 'DES';

    const KEY_SIZE = 8;

    const IV_SIZE = 8;

    const BLOCK_SIZE = 8;

    protected static $validBlockModes = [
        self::CBC_MODE,
        self::CFB_MODE,
        self::OFB_MODE,
        self::ECB_MODE
    ];

    protected function fetchAlgorithmMethodName()
    {
        return static::ALGORITHM_NAME . '-' . $this->mode;
    }

    protected function validateBlockModeSupport($mode)
    {
        $methodName = static::ALGORITHM_NAME . '-' . $mode;

        $supported = in_array(
            strtolower($methodName),
            openssl_get_cipher_methods(),
            true
        );
        if ($supported) {
            throw new \RuntimeException(
                'The algorithm `' . $methodName . '`is not supported.'
            );
        }
    }
}

$data = 'test';

$rot13 = new Rot13();
$rot13->setSecretKey('yez');

$des = new Des();
$des->setSecretKey('zzz')
    ->setInitializationVector('xxx');

$encrypted = $rot13->encryptData($data);
$decrypted = $rot13->decryptData($encrypted);

echo 'Data: ' . $data . '<br>';
echo 'Encrypted: ' . $encrypted . '<br>';
echo 'Decrypted: ' . $decrypted . '<br>';

$encrypted = $des->encryptData($data);
$decrypted = $des->decryptData($encrypted);

echo 'Data: ' . $data . '<br>';
echo 'Encrypted: ' . $encrypted . '<br>';
echo 'Decrypted: ' . $decrypted . '<br>';
```

### [](#extending-asymmetric-ciphers){:.book_mark}Extending Asymmetric Ciphers ###

&nbsp;&nbsp;&nbsp;&nbsp;Here are a few simple examples for defining new asymmetric systems via the cryptography model
extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\MessageEncryption\AbstractRsaEncryption;
use CryptoManana\Core\Abstractions\MessageEncryption\AbstractDsaSignature;
use CryptoManana\Utilities\TokenGenerator;

class Rsa512 extends AbstractRsaEncryption
{
    const KEY_SIZE = 512;
}

class Dsa1536 extends AbstractDsaSignature
{
    const KEY_SIZE = 1536;
}

$generator = new TokenGenerator();

$keyPair = $generator->getAsymmetricKeyPair(
    Rsa512::KEY_SIZE,
    $generator::RSA_KEY_PAIR_TYPE
);

$crypter = new Rsa512();

$crypter->setKeyPair($keyPair);

$data = 'testing information';

echo 'Data: ' . $data . '<br>';

$cipherData = $crypter->encryptData($data);
echo 'Cipher Data: ' . $cipherData . '<br>';

echo $data === $crypter->decryptData($cipherData) ?
    'Data is decrypted successfully' : 'Wrong decryption!';

// This signature is self-signed
$keyPair = $generator->getAsymmetricKeyPair(
    Dsa1536::KEY_SIZE,
    $generator::DSA_KEY_PAIR_TYPE
);


$signer = new Dsa1536();

$signer->setKeyPair($keyPair);

$signature = $signer->signData($data);

echo 'Data: ' . $data . '<br>';
echo 'Signature: ' . $signature . '<br>';

if ($signer->verifyDataSignature($signature, $data)) {
    echo "The signature is valid!";
} else {
    echo "Invalid data or signature!";
}
```

### [](#extending-cryptography-services){:.book_mark}Extending Cryptography Services ###

&nbsp;&nbsp;&nbsp;&nbsp;Here are a few simple examples for defining new cryptographic services via the cryptography
model extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\Containers\AbstractCryptographicProtocol;
use CryptoManana\Core\Abstractions\Containers\AbstractRandomnessInjectable;
use CryptoManana\Core\Abstractions\MessageEncryption\AbstractBlockCipherAlgorithm;
use CryptoManana\Core\Interfaces\Containers\SymmetricEncryptionInjectableInterface;
use CryptoManana\Core\Interfaces\MessageEncryption\DataEncryptionInterface;
use CryptoManana\Core\Traits\Containers\SymmetricEncryptionInjectableTrait;
use CryptoManana\SymmetricEncryption\Aes192;
use CryptoManana\Core\StringBuilder;

class TwoPassEncryption extends
    AbstractCryptographicProtocol implements
    SymmetricEncryptionInjectableInterface
{
    use SymmetricEncryptionInjectableTrait;

    protected $symmetricCipherSource = null;

    public function __construct(AbstractBlockCipherAlgorithm $cipher = null)
    {
        if ($cipher instanceof DataEncryptionInterface) {
            $this->symmetricCipherSource = $cipher;
        } else {
            throw new \RuntimeException(
                'No symmetric encryption service has been set.'
            );
        }
    }

    public function __destruct()
    {
        unset($this->symmetricCipherSource);
    }

    public function __clone()
    {
        $this->symmetricCipherSource = clone $this->symmetricCipherSource;
    }

    public function encryptDataTwice($plainData)
    {
        $cipherData = $this->symmetricCipherSource->encryptData($plainData);

        return $this->symmetricCipherSource->encryptData(
            StringBuilder::stringReverse($cipherData)
        );
    }


    public function decryptDataTwice($cipherData)
    {
        $plainData = $this->symmetricCipherSource->decryptData($cipherData);
        $plainData = StringBuilder::stringReverse($plainData);

        return $this->symmetricCipherSource->decryptData($plainData);
    }
}

class QuestionAnswerer extends AbstractRandomnessInjectable
{
    public function askQuestion($question = '')
    {
        if (!is_string($question)) {
            throw new \InvalidArgumentException(
                'The supplied argument is not of type string.'
            );
        }

        $answers = [
            'Yes.',
            'No.',
            'Maybe..',
            'I don\'t know!',
            'Can you repeat that question?!',
            'Yez?'
        ];

        $index = $this->randomnessSource->getInt(0, count($answers) - 1);

        return $answers[$index];
    }
}

$symmetricCipher = new Aes192();

$symmetricCipher->setSecretKey('crypto')
    ->setInitializationVector('manana');

$protocol = new TwoPassEncryption($symmetricCipher);

$data = 'test information';

echo 'Original Data: ' . $data . '<br>';

$encryptedData = $protocol->encryptDataTwice($data, 7);
$decryptedData = $protocol->decryptDataTwice($encryptedData, 7);
$wrongDecrypt = $protocol->encryptDataTwice($encryptedData . 'z$13=Fя');

echo 'Encrypted Data: ' . $encryptedData . '<br>';
echo 'Decrypted Data: ' . $decryptedData . '<br>';
echo 'Wrongly Decrypted: ' . $wrongDecrypt . '<br>';

$crystalBall = new QuestionAnswerer();

$question = 'Will I get lucky tonight?';
echo 'Question: ' . $question . '<br>';
echo 'Answer: ' . $crystalBall->askQuestion($question) . '<br>';
```

### [](#extending-data-structures){:.book_mark}Extending Data Structures ###

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for defining a new data structure for services via the cryptography
model extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\DataStructures\AbstractBasicStructure;

class TimedData extends AbstractBasicStructure
{
    protected $data = '';

    protected $times = 0;

    public function __construct($data = '', $times = 0)
    {
        $this->__set('data', $data);
        $this->__set('times', $times);
    }

    public function __destruct()
    {
    }

    public function __toString()
    {
        return 'data : ' . $this->data . ' | times : ' . $this->times;
    }
}

$tmp = new TimedData();

$tmp->data = 'data';
$tmp->times = 2;
$tmp->times = []; // error
```

### [](#extending-framework-exceptions){:.book_mark}Extending Framework Exception ###

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for defining a new framework exception via the cryptography model
extension approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\ErrorHandling\AbstractCryptologyException;

class WrongConfigurationException extends AbstractCryptologyException
{
    const INTERNAL_CODE = 69;

    protected $code = self::INTERNAL_CODE;

    public function getFrameworkErrorCode()
    {
        return static::INTERNAL_CODE;
    }
}

$tmp = new WrongConfigurationException();

throw $tmp->setCode(500)
    ->setMessage('Wrong configuration')
    ->setFile(__FILE__)
    ->setLine(__LINE__);
```

### [](#extending-factories){:.book_mark}Extending Factories ###

&nbsp;&nbsp;&nbsp;&nbsp;Here is a simple example for defining a new factory via the cryptography model extension
approach:

{% include code_copy_header.html %}

```php
use CryptoManana\Core\Abstractions\DesignPatterns\AbstractFactory;

abstract class AbstractNumber
{
    abstract public function __toString();
}

class One extends AbstractNumber
{
    const NAME = '1';

    public function __toString()
    {
        return self::NAME;
    }
}

class Two extends AbstractNumber
{
    const NAME = '2';

    public function __toString()
    {
        return self::NAME;
    }
}

class NumberFactory extends AbstractFactory
{
    const NUMBER_ONE = One::class;

    const NUMBER_TWO = Two::class;

    public function __debugInfo()
    {
        return [
            self::class . '::NUMBER_ONE' => self::NUMBER_ONE,
            self::class . '::NUMBER_TWO' => self::NUMBER_TWO,
        ];
    }

    public function create($type)
    {
        return self::createInstance($type);
    }

    public static function createInstance($type)
    {
        if (
            class_exists($type) &&
            is_subclass_of($type, AbstractNumber::class)
        ) {
            $exception = new $type();
        } else {
            $exception = null; // Invalid type given
        }

        return $exception;
    }
}

$factory = new NumberFactory();

echo 'Results: ' . '<br>';
echo $factory->create($factory::NUMBER_ONE);
echo $factory::createInstance($factory::NUMBER_TWO);
```

{% include section_navigation_buttons.html %}