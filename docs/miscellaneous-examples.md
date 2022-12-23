---
title: Miscellaneous Use Cases (CryptoManana Docs)
description: Miscellaneous or Advanced Use Cases.
redirect_from:
  - /en/docs/miscellaneous-examples/
  - /en/docs/miscellaneous-examples
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Miscellaneous Use Cases
    url: /docs/miscellaneous-examples
navigation:
  previous:
    title: Previous
    url: /docs/use-case-examples
  next:
    title: Next
    url: /docs/technical-api
---

{% include breadcrumbs.html %}

### [](#combining-encryption-and-compression){:.book_mark}Combining Encryption and Compression ###

&nbsp;&nbsp;&nbsp;&nbsp;In the security practice, a lot of developers decide to combine encryption with compression.
This is because it may increase the entropy of the message (high disorder and low energy) and reduce repatriations. An
interesting fact is that encryption by itself already increases the input message's entropy, but if you apply lossless
compression algorithms (with full recovery), then you can avoid certain block or side-channel attacks. This comes with
an increased size price of the ending cipher data message. Note that binary files or installation files are already
files with high entropy, so you would not gain anything by compressing them first. For example, if you compress a simple
image before encrypting it, you can have a lot of security gains. It is important to note that applying the compression
after the encryption (opposite strategy) will not increase security, but just zip the file and make it bigger (since it
is already with high entropy). Here is a simple example in which you can achieve that with the framework:

{% include code_copy_header.html %}

```php
use CryptoManana\SymmetricEncryption\Aes256;

$crypter = new Aes256();

$crypter->setSecretKey('security')
    ->setInitializationVector('is a top priority')
    ->setCipherFormat($crypter::ENCRYPTION_OUTPUT_HEX_UPPER)
    ->setBlockOperationMode($crypter::CTR_MODE)
    ->setPaddingStandard($crypter::PKCS7_PADDING);

if (!extension_loaded('zlib')) {
    throw new \Exception(
        'The zlib extension must be available for this example!'
    );
}

$data = 'testing information';

echo 'Data: ' . $data . '<br>';

// 1. Compress the data
$compressed = gzcompress($data, 9);
echo 'Compressed Data: ' . $compressed . '<br>';

// 2. Encrypt the data
$cipherData = $crypter->encryptData($compressed);
echo 'Cipher Data: ' . $cipherData . '<br>';

// 3. Decrypt the data
$decrypted = $crypter->decryptData($cipherData);
echo 'Decrypted Data: ' . $decrypted . '<br>';

// 4. Decompress the data
$decompressed = gzuncompress($decrypted);
echo 'Decompressed Data: ' . $decompressed . '<br>';

echo $data === $decompressed ?
    'Data is decrypted successfully' : 'Wrong decryption!';
```

### [](#cryptographic-data-erasure){:.book_mark}Cryptographic Data Erasure ###

&nbsp;&nbsp;&nbsp;&nbsp;With the technological advances of disk drive media, such as Solid State Drives (SSD) and mobile
flash chips, the standard secure data deletion methods can reduce the life of the used hardware by a lot. This is why
some developers switch to the method of cryptographic erasure which does not wipe the whole disk, but instead overrides
securely the current disk encryption configuration. This method is faster and reduces disk wear more than the standard
secure wipe techniques. The main downside of its usage is that in time the used encryption algorithm may be broken or
exploited, rendering the data completely "naked" (or raw), instead of securely deleted. This method can also be
integrated on a file based occasion for some hosting providers or mobile devices to reduce cost of disk ware. When the
final hardware is for erasure, it is recommended that the entire media must by sanitized with a standard wipe-out
method (see
[the `FileShredder` secure service](./secure-data-services.html#file-shredder-service "The `FileShredder` Service"){:
target="_blank"} for more information). Here is a basic example for the realization of this technique with the
framework:

{% include code_copy_header.html %}

```php
use CryptoManana\SymmetricEncryption\Aes256;
use CryptoManana\Utilities\TokenGenerator;

$path = trim(sys_get_temp_dir()) ?: (string)ini_get('upload_tmp_dir');
$fileName = $path . DIRECTORY_SEPARATOR . 'for-deletion.tmp';

$generator = new TokenGenerator();
$crypter = new Aes256();

// 1. Generate random key and IV
$crypter->setSecretKey($generator->getEncryptionKey($crypter::KEY_SIZE))
    ->setInitializationVector($generator->getHashingKey($crypter::IV_SIZE));

$crypter->setBlockOperationMode($crypter::CTR_MODE)
    ->setPaddingStandard($crypter::PKCS7_PADDING)
    ->setCipherFormat($crypter::ENCRYPTION_OUTPUT_RAW);

// populate a testing file
file_put_contents($fileName, $generator->getRandomGenerator()->getBase64(10));

echo 'File Location: ' . $fileName . '<br>';
echo 'File Content: ' . file_get_contents($fileName) . '<br>';

// 2. Secure rename
$renamedFilename = $path . DIRECTORY_SEPARATOR;
$renamedFilename .= $generator->getTokenString(strlen($fileName)) . '.tmp';
rename($fileName, $renamedFilename);
$fileName = $renamedFilename;

echo 'New File Name: ' . $fileName . '<br>';

// 2. Encrypt the file contents and delete configuration
file_put_contents($fileName, $crypter->encryptFile($fileName), LOCK_EX);

$crypter->setSecretKey($generator->getPasswordString($crypter::KEY_SIZE))
    ->setInitializationVector($generator->getHashingKey($crypter::IV_SIZE));

// 3. Delete the file and configuration
unlink($fileName);

clearstatcache(true, $fileName);

echo 'Result: ';
echo !file_exists($fileName) ? 'File is cryptographically erased!' : 'Error!';
```

### [](#transferring-objects){:.book_mark}Transferring Objects ###

&nbsp;&nbsp;&nbsp;&nbsp;One other use of the framework is the ability to serialize and transfer whole objects in some
encrypted format. This can be useful when you need to transfer certain cryptography logic between two systems and want
to save some configuring time. Most framework objects are fully serializable and can be transferred as follows:

{% include code_copy_header.html %}

```php
use CryptoManana\SymmetricEncryption\Aes256;
use CryptoManana\Hashing\Md5;
use \stdClass as stdClass;

$crypter = new Aes256();

$crypter->setSecretKey('hit hard')
    ->setInitializationVector('and hit hard')
    ->setCipherFormat($crypter::ENCRYPTION_OUTPUT_BASE_64_URL);

$hasher = new Md5();
$hasher->setSalt('salt string');

$object = new stdClass();
$object->data = ['some', 'data'];
$object->hasher = $hasher;

//$object->information

$cipherObject = $crypter->encryptObject($object);
echo 'Cipher Object: ' . $cipherObject . '<br>';
echo 'Hasher Original Salt: ' . $hasher->getSalt() . '<br>';
unset($hasher);

// Send to another system //

$tmp = $crypter->decryptObject($cipherObject);

echo $object->data === $tmp->data ?
    'Object is decrypted successfully' : 'Wrong decryption!';

echo 'Hasher Transferred Salt: ' . $tmp->hasher->getSalt() . '<br>';
```

### [](#processing-multiple-signatures){:.book_mark}Processing Multiple Signatures ###

&nbsp;&nbsp;&nbsp;&nbsp;Sometimes, we have resources that are signed by multiple authorities and need a more complex
validation. Most systems require at least one of the signatures to be valid for the data to be valid, but others do not.
Here is a simple example when having to process multiple signatures and search for at least one valid:

{% include code_copy_header.html %}

```php
use CryptoManana\CryptographicProtocol\DigitalSignature;
use CryptoManana\AsymmetricEncryption\Dsa2048;
use CryptoManana\Utilities\TokenGenerator;

$generator = new TokenGenerator();

// This signature is self-signed
$keyPairOne = $generator->getAsymmetricKeyPair(
    $generator::KEY_PAIR_2048_BITS,
    $generator::DSA_KEY_PAIR_TYPE
);

// This signature is self-signed
$keyPairTwo = $generator->getAsymmetricKeyPair(
    $generator::KEY_PAIR_2048_BITS,
    $generator::DSA_KEY_PAIR_TYPE
);

$signer = new Dsa2048();

$signer->setKeyPair($keyPairOne)
    ->setSignatureFormat($signer::SIGNATURE_OUTPUT_HEX_LOWER)
    ->setSignatureDigestion($signer::SHA2_512_SIGNING);

$signatureService = new DigitalSignature($signer);

// Multi-signing
$data = 'testing information';

$signedDataOne = $signatureService->createSignedData($data);
echo 'Original Data: ' . $data . '<br>';
echo 'Signature One: ' . $signedDataOne->signature . '<br>';

$data = $data . 'modified';
$signatureService->getSignatureStandard()->setKeyPair($keyPairTwo);
$signedDataTwo = $signatureService->createSignedData($data);

echo 'Modified Data: ' . $data . '<br>';
echo 'Signature Two: ' . $signedDataTwo->signature . '<br>';

$signatures = [
    $signedDataOne,
    $signedDataTwo,
];

$publicKeys = [$keyPairOne->public, $keyPairTwo->public];

// Multi validation

$hasValid = false;
$validCount = 0;

foreach ($signatures as $signature) {
    foreach ($publicKeys as $publicKey) {
        try {
            $signatureService->getSignatureStandard()->setPublicKey($publicKey);
            $extractedData = $signatureService->extractVerifiedData($signature);

            if ($extractedData == $data) {
                echo 'Found a valid signature!';

                $validCount++;

                break;
            }
        } catch (\Exception $ex) {
            echo 'Found an invalid signature!';

            continue;
        }
    }
}

if ($validCount) {
    echo 'Valid signatures: ' . $validCount . ' from ' . count($signatures);
} else {
    echo 'No valid signatures were found!';
}
```

{% include section_navigation_buttons.html %}