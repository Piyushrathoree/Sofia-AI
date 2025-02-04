import hashlib

def hash_passwd(password):
    hash_sha256 = hashlib.sha256()
    hash_sha256.update(password.encode('utf-8'))
    return hash_sha256.hexdigest()