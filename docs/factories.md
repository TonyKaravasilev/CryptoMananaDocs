---
title: Framework Factories (CryptoManana Docs)
description: Framework Factories.
redirect_from:
  - /en/docs/factories/
  - /en/docs/factories
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Framework Factories
    url: /docs/factories
navigation:
  previous:
    title: Previous
    url: /docs/exceptions
  next:
    title: Next
    url: /docs/core
---

{% include breadcrumbs.html %}

### [](#component-factories){:.book_mark}Component Factories ###

&nbsp;&nbsp;&nbsp;&nbsp;The software framework supports the creation design pattern factory, which is widely used to
initialize primitive components without exposing the creation logic to the user and refer to the newly created objects
using a common interface. The developer can use them in the cryptographic context for the easier creation of all
available components.

&nbsp;&nbsp;&nbsp;&nbsp;The **CryptoMañana (CryptoManana) cryptography framework** provides all available factories at
the [`\CryptoManana\Factories`](../api/namespaces/CryptoManana.Factories.html "exceptions"){:
target="_blank"} namespace. Here is a list of all factory components:

- `RandomnessFactory` - Factory for pseudo-randomness generator instancing;
- `HashAlgorithmFactory` - Factory for hash algorithm object instancing;
- `SymmetricCipherFactory` - Factory for symmetric cipher instancing;
- `AsymmetricCipherFactory` - Factory for asymmetric system object instancing;
- `ExceptionFactory` - Factory for framework exception instancing.

&nbsp;&nbsp;&nbsp;&nbsp;They all create instances via the dynamic method `create()` and the static `createInstance()`
via the factory's available constants. The provided software components for hashing in the cryptography model always
include:

```php
create() // dynamic method for instancing
createInstance() // static method for instancing
```

### [](#randomness-factory-constants){:.book_mark}Randomness Factory Constants ###

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has 3 public constants available:

```php
/**
 * The quasi-random generator type.
 */
const QUASI_SOURCE = QuasiRandomness::class;

/**
 * The pseudo-random generator type.
 */
const PSEUDO_SOURCE = PseudoRandomness::class;

/**
 * The cryptographically secure pseudo-random generator type.
 */
const CRYPTO_SOURCE = CryptographyRandomness::class;
```

### [](#hash-function-randomness-factory-constants){:.book_mark}Hash Function Factory Constants ###

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has multiple public constants available:

```php
/**
 * The MD5 type.
 */
const MD5 = Md5::class;

/**
 * The HMAC-MD5 type.
 */
const HMAC_MD5 = HmacMd5::class;

/**
 * The HKDF-MD5 type.
 */
const HKDF_MD5 = HkdfMd5::class;

/**
 * The PBKDF2-MD5 type.
 */
const PBKDF2_MD5 = Pbkdf2Md5::class;

/**
 * The SHA-1 type.
 */
const SHA1 = Sha1::class;

/**
 * The HMAC-SHA-1 type.
 */
const HMAC_SHA1 = HmacSha1::class;

/**
 * The HKDF-SHA-1 type.
 */
const HKDF_SHA1 = HkdfSha1::class;

/**
 * The PBKDF2-SHA-1 type.
 */
const PBKDF2_SHA1 = Pbkdf2Sha1::class;

/**
 * The SHA-2-224 type.
 */
const SHA2_224 = ShaTwo224::class;

/**
 * The HMAC-SHA-2-224 type.
 */
const HMAC_SHA2_224 = HmacShaTwo224::class;

/**
 * The HKDF-SHA-2-224 type.
 */
const HKDF_SHA2_224 = HkdfShaTwo224::class;

/**
 * The PBKDF2-SHA-2-224 type.
 */
const PBKDF2_SHA2_224 = Pbkdf2ShaTwo224::class;

/**
 * The SHA-2-256 type.
 */
const SHA2_256 = ShaTwo256::class;

/**
 * The HMAC-SHA-2-256 type.
 */
const HMAC_SHA2_256 = HmacShaTwo256::class;

/**
 * The HKDF-SHA-2-256 type.
 */
const HKDF_SHA2_256 = HkdfShaTwo256::class;

/**
 * The PBKDF2-SHA-2-256 type.
 */
const PBKDF2_SHA2_256 = Pbkdf2ShaTwo256::class;

/**
 * The SHA-2-384 type.
 */
const SHA2_384 = ShaTwo384::class;

/**
 * The HMAC-SHA-2-384 type.
 */
const HMAC_SHA2_384 = HmacShaTwo384::class;

/**
 * The HKDF-SHA-2-384 type.
 */
const HKDF_SHA2_384 = HkdfShaTwo384::class;

/**
 * The PBKDF2-SHA-2-384 type.
 */
const PBKDF2_SHA2_384 = Pbkdf2ShaTwo384::class;

/**
 * The SHA-2-512 type.
 */
const SHA2_512 = ShaTwo512::class;

/**
 * The HMAC-SHA-2-512 type.
 */
const HMAC_SHA2_512 = HmacShaTwo512::class;

/**
 * The HKDF-SHA-2-512 type.
 */
const HKDF_SHA2_512 = HkdfShaTwo512::class;

/**
 * The PBKDF2-SHA-2-512 type.
 */
const PBKDF2_SHA2_512 = Pbkdf2ShaTwo512::class;

/**
 * The SHA-3-224 type.
 */
const SHA3_224 = ShaThree224::class;

/**
 * The HMAC-SHA-3-224 type.
 */
const HMAC_SHA3_224 = HmacShaThree224::class;

/**
 * The HKDF-SHA-3-224 type.
 */
const HKDF_SHA3_224 = HkdfShaThree224::class;

/**
 * The PBKDF2-SHA-3-224 type.
 */
const PBKDF2_SHA3_224 = Pbkdf2ShaThree224::class;

/**
 * The SHA-3-256 type.
 */
const SHA3_256 = ShaThree256::class;

/**
 * The HMAC-SHA-3-256 type.
 */
const HMAC_SHA3_256 = HmacShaThree256::class;

/**
 * The HKDF-SHA-3-256 type.
 */
const HKDF_SHA3_256 = HkdfShaThree256::class;

/**
 * The PBKDF2-SHA-3-256 type.
 */
const PBKDF2_SHA3_256 = Pbkdf2ShaThree256::class;

/**
 * The SHA-3-384 type.
 */
const SHA3_384 = ShaThree384::class;

/**
 * The HMAC-SHA-3-384 type.
 */
const HMAC_SHA3_384 = HmacShaThree384::class;

/**
 * The HKDF-SHA-3-384 type.
 */
const HKDF_SHA3_384 = HkdfShaThree384::class;

/**
 * The PBKDF2-SHA-3-384 type.
 */
const PBKDF2_SHA3_384 = Pbkdf2ShaThree384::class;

/**
 * The SHA-3-512 type.
 */
const SHA3_512 = ShaThree512::class;

/**
 * The HMAC-SHA-3-512 type.
 */
const HMAC_SHA3_512 = HmacShaThree512::class;

/**
 * The HKDF-SHA-3-512 type.
 */
const HKDF_SHA3_512 = HkdfShaThree512::class;

/**
 * The PBKDF2-SHA-3-512 type.
 */
const PBKDF2_SHA3_512 = Pbkdf2ShaThree512::class;

/**
 * The RIPEMD-128 type.
 */
const RIPEMD_128 = Ripemd128::class;

/**
 * The HMAC-RIPEMD-128 type.
 */
const HMAC_RIPEMD_128 = HmacRipemd128::class;

/**
 * The HKDF-RIPEMD-128 type.
 */
const HKDF_RIPEMD_128 = HkdfRipemd128::class;

/**
 * The PBKDF2-RIPEMD-128 type.
 */
const PBKDF2_RIPEMD_128 = Pbkdf2Ripemd128::class;

/**
 * The RIPEMD-160 type.
 */
const RIPEMD_160 = Ripemd160::class;

/**
 * The HMAC-RIPEMD-160 type.
 */
const HMAC_RIPEMD_160 = HmacRipemd160::class;

/**
 * The HKDF-RIPEMD-160 type.
 */
const HKDF_RIPEMD_160 = HkdfRipemd160::class;

/**
 * The PBKDF2-RIPEMD-160 type.
 */
const PBKDF2_RIPEMD_160 = Pbkdf2Ripemd160::class;

/**
 * The RIPEMD-256 type.
 */
const RIPEMD_256 = Ripemd256::class;

/**
 * The HMAC-RIPEMD-256 type.
 */
const HMAC_RIPEMD_256 = HmacRipemd256::class;

/**
 * The HKDF-RIPEMD-256 type.
 */
const HKDF_RIPEMD_256 = HkdfRipemd256::class;

/**
 * The PBKDF2-RIPEMD-256 type.
 */
const PBKDF2_RIPEMD_256 = Pbkdf2Ripemd256::class;

/**
 * The RIPEMD-320 type.
 */
const RIPEMD_320 = Ripemd320::class;

/**
 * The HMAC-RIPEMD-320 type.
 */
const HMAC_RIPEMD_320 = HmacRipemd320::class;

/**
 * The HKDF-RIPEMD-320 type.
 */
const HKDF_RIPEMD_320 = HkdfRipemd320::class;

/**
 * The PBKDF2-RIPEMD-320 type.
 */
const PBKDF2_RIPEMD_320 = Pbkdf2Ripemd320::class;

/**
 * The Whirlpool type.
 */
const WHIRLPOOL = Whirlpool::class;

/**
 * The HMAC-Whirlpool type.
 */
const HMAC_WHIRLPOOL = HmacWhirlpool::class;

/**
 * The HKDF-Whirlpool type.
 */
const HKDF_WHIRLPOOL = HkdfWhirlpool::class;

/**
 * The PBKDF2-Whirlpool type.
 */
const PBKDF2_WHIRLPOOL = Pbkdf2Whirlpool::class;

/**
 * The Bcrypt type.
 */
const BCRYPT = Bcrypt::class;

/**
 * The Argon2 type.
 */
const ARGON2 = Argon2::class;
```

### [](#symmetric-cipher-factory-constants){:.book_mark}Symmetric Cipher Factory Constants ###

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has multiple public constants available:

```php
/**
 * The AES-128 type.
 */
const AES_128 = Aes128::class;

/**
 * The AES-192 type.
 */
const AES_192 = Aes192::class;

/**
 * The AES-256 type.
 */
const AES_256 = Aes256::class;

/**
 * The CAMELLIA-128 type.
 */
const CAMELLIA_128 = Camellia128::class;

/**
 * The CAMELLIA-192 type.
 */
const CAMELLIA_192 = Camellia192::class;

/**
 * The CAMELLIA-256 type.
 */
const CAMELLIA_256 = Camellia256::class;

/**
 * The 3DES-168 type.
 */
const TRIPLE_DES_168 = TripleDes::class;

/**
 * The RC4-128 type.
 */
const RC4_128 = Rc4::class;
```

### [](#asymmetric-cipher-factory-constants){:.book_mark}Asymmetric Cipher Factory Constants ###

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has multiple public constants available:

```php
/**
 * The RSA-1024 type.
 */
const RSA_1024 = Rsa1024::class;

/**
 * The RSA-2048 type.
 */
const RSA_2048 = Rsa2048::class;

/**
 * The RSA-3072 type.
 */
const RSA_3072 = Rsa3072::class;

/**
 * The RSA-4096 type.
 */
const RSA_4096 = Rsa4096::class;

/**
 * The DSA-1024 type.
 */
const DSA_1024 = Dsa1024::class;

/**
 * The DSA-2048 type.
 */
const DSA_2048 = Dsa2048::class;

/**
 * The DSA-3072 type.
 */
const DSA_3072 = Dsa3072::class;

/**
 * The DSA-4096 type.
 */
const DSA_4096 = Dsa4096::class;
```

### [](#asymmetric-cipher-factory-constants){:.book_mark}Asymmetric Cipher Factory Constants ###

&nbsp;&nbsp;&nbsp;&nbsp;This type of component has multiple public constants available:

```php
/**
 * The `cryptography` exception type.
 */
const CRYPTOGRAPHY_PROBLEM = CryptographyProblem::class;

/**
 * The `bad practice` exception type.
 */
const BAD_PRACTICE = BadPractice::class;

/**
 * The `unsupported algorithm` exception type.
 */
const UNSUPPORTED_ALGORITHM = UnsupportedAlgorithm::class;

/**
 * The `backward incompatible` exception type.
 */
const BACKWARD_INCOMPATIBLE = BackwardIncompatible::class;

/**
 * The `access denied` exception type.
 */
const ACCESS_DENIED = AccessDenied::class;

/**
 * The `breach attempt` exception type.
 */
const BREACH_ATTEMPT = BreachAttempt::class;

/**
 * The `malicious payload` exception type.
 */
const MALICIOUS_PAYLOAD = MaliciousPayload::class;

/**
 * The `bot detected` exception type.
 */
const BOT_DETECTED = BotDetected::class;

/**
 * The `identification failure` exception type.
 */
const IDENTIFICATION_FAILURE = IdentificationFailure::class;

/**
 * The `authentication failure` exception type.
 */
const AUTHENTICATION_FAILURE = AuthenticationFailure::class;

/**
 * The `authorization failure` exception type.
 */
const AUTHORIZATION_FAILURE = AuthorizationFailure::class;

/**
 * The `session expired` exception type.
 */
const SESSION_EXPIRED = SessionExpired::class;

/**
 * The `token expired` exception type.
 */
const TOKEN_EXPIRED = TokenExpired::class;

/**
 * The `wrong configuration` exception type.
 */
const WRONG_CONFIGURATION = WrongConfiguration::class;

/**
 * The `insecure usage` exception type.
 */
const INSECURE_USAGE = InsecureUsage::class;
```

{% include section_navigation_buttons.html %}