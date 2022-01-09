const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();

/**
 * Updates HTML file by given returns
 */
function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerHTML = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

/**
 * Calculates weakness of password by given functions
 * @param {string} password - Input Password
 * @returns weakness of password
 */
function calculatePasswordStrength(password) {
  const weakness = [];
  weakness.push(lengthWeakness(password));
  weakness.push(lowerCaseWeakness(password));
  weakness.push(upperCaseWeakness(password));
  weakness.push(numberWeakness(password));
  weakness.push(specialCharacterWeakness(password));
  return weakness;
}

/**
 * Calculates length of password
 * @param {string} password
 *
 */
function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40, // Short passwords effects 40% to calculation
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}

/**
 *
 * @param {string} password
 * @returns weakness by lowercase characters number
 */
function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
}

/**
 *
 * @param {string} password
 * @returns weakness by uppercase characters number
 */
function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
}

/**
 *
 * @param {string} password
 * @returns weakness by number type characters number
 */
function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

/**
 *
 * @param {string} password
 * @returns weakness by special characters number
 */
function specialCharacterWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

/**
 * Calculates strength of different input types
 * @param {string} password - Input password
 * @param {string} regex - Regex Expression type
 * @param {string} type - Regexr function name
 * @returns Reason of warning
 */
function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
}
