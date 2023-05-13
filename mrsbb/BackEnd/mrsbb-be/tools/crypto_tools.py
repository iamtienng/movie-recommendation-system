# author: @iamtienng
# import crypto tools
import rsa
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto import Random

# RSA


def generateRSAKeyPair():
    (publicKey, privateKey) = rsa.newkeys(1024)
    with open('keys/publicKey.pem', 'wb') as p:
        p.write(publicKey.save_pkcs1('PEM'))
    with open('keys/privateKey.pem', 'wb') as p:
        p.write(privateKey.save_pkcs1('PEM'))


def loadRSAKeyPair():
    with open('keys/publicKey.pem', 'rb') as p:
        publicKey = rsa.PublicKey.load_pkcs1(p.read())
    with open('keys/privateKey.pem', 'rb') as p:
        privateKey = rsa.PrivateKey.load_pkcs1(p.read())
    return privateKey, publicKey


def encryptRSA(message, key):
    return rsa.encrypt(message.encode('ascii'), key)


def decryptRSA(ciphertext, key):
    try:
        return rsa.decrypt(ciphertext, key).decode('ascii')
    except:
        return False


# AES 256
BLOCK_SIZE = 16
def pad(s): return s + (BLOCK_SIZE - len(s) %
                        BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)


def unpad(s): return s[:-ord(s[len(s) - 1:])]


# passwordAES = open("./keys/aes256password.pem", "rb").read()


def encryptAES(raw, passwordAES):
    private_key = hashlib.sha256(passwordAES.encode("utf-8")).digest()
    raw = pad(raw)
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return base64.b64encode(iv + cipher.encryptAES(raw))


def decryptAES(enc, passwordAES):
    private_key = hashlib.sha256(passwordAES.encode("utf-8")).digest()
    enc = base64.b64decode(enc)
    iv = enc[:16]
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return unpad(cipher.decryptAES(enc[16:]))

# md5


def md5(string):
    return hashlib.md5(string.encode('utf-8')).hexdigest()
