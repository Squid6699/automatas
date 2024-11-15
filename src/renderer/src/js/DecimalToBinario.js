export function decimalToBinaryOrHex(decimalNumber, type = "binary", bytes = 1) {
  if (decimalNumber < 0) {
    throw new Error("El número debe ser positivo.");
  }

  if (!["binary", "hexadecimal"].includes(type)) {
    throw new Error("El tipo debe ser 'binary' o 'hexadecimal'.");
  }

  const bits = bytes * 8; // Cada byte tiene 8 bits
  const maxValue = 2 ** bits - 1;

  if (decimalNumber > maxValue) {
    throw new Error(`El número excede el rango de ${bits} bits (${maxValue}).`);
  }

  if (type === "binary") {
    const binary = decimalNumber.toString(2).padStart(bits, "0"); // Convierte a binario y ajusta al número de bits
    // Separa los bits en bloques de 8 (1 byte) y une con espacios
    return binary.match(/.{1,8}/g).join(" ");
  }

  if (type === "hexadecimal") {
    const hex = decimalNumber.toString(16).toUpperCase(); // Convierte a hexadecimal
    const hexLength = Math.max(4, Math.ceil(bits / 4)); // Mínimo 4 caracteres
    return hex.padStart(hexLength, "0"); // Ajusta al tamaño calculado, sin separaciones
  }
}
