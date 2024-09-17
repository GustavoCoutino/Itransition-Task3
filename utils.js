import crypto from "crypto";

class HmacGenerator {
  generateHmac(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }

  generateSecretKey() {
    return crypto.randomBytes(32).toString("hex");
  }
}

export default HmacGenerator;
