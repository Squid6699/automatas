export function decimalToBinaryOrHex(input, type = "binary", bytes) {
  if (type === "hexToBinary") {
    if (typeof input !== "string" || !/^[\dA-Fa-f]+$/.test(input)) {
      throw new Error("El valor hexadecimal debe ser una cadena válida.");
    }

    const bits = bytes * 8; // Cada byte tiene 8 bits
    const decimalNumber = parseInt(input, 16); // Convierte de hexadecimal a decimal

    if (decimalNumber > 2 ** bits - 1) {
      throw new Error(
        `El número hexadecimal excede el rango de ${bits} bits (${2 ** bits - 1}).`
      );
    }

    const binary = decimalNumber.toString(2).padStart(bits, "0"); // Convierte a binario
    return binary.match(/.{1,8}/g).join(" "); // Divide en bloques de 8 bits
  }

  // Validaciones comunes para los otros tipos
  if (typeof input !== "number" || input < 0) {
    throw new Error("El número debe ser positivo y un valor numérico.");
  }

  if (!["binary", "hexadecimal", "hexToBinary"].includes(type)) {
    throw new Error("El tipo debe ser 'binary', 'hexadecimal' o 'hexToBinary'.");
  }

  // Calcula automáticamente los bytes si no se proporcionan
  if (!bytes) {
    const bitsNeeded = Math.ceil(Math.log2(input + 1)); // Bits necesarios para el número
    bytes = Math.ceil(bitsNeeded / 8) || 1; // Calcula los bytes necesarios, mínimo 1 byte
  }

  const bits = bytes * 8; // Cada byte tiene 8 bits
  const maxValue = 2 ** bits - 1;

  if (input > maxValue) {
    throw new Error(`El número excede el rango de ${bits} bits (${maxValue}).`);
  }

  if (type === "binary") {
    const binary = input.toString(2).padStart(bits, "0"); // Convierte a binario
    return binary.match(/.{1,8}/g).join(" "); // Divide en bloques de 8 bits
  }

  if (type === "hexadecimal") {
    const hex = input.toString(16).toUpperCase(); // Convierte a hexadecimal
    const hexLength = Math.ceil(bits / 4); // Calcula la longitud necesaria para el hexadecimal
    return hex.padStart(hexLength, "0"); // Ajusta al tamaño calculado
  }
}
