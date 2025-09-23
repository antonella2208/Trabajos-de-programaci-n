 // ---------------- FUNCIONES ----------------

// 1) Suma de números únicos
function sumUnique(nums) {
  const set = new Set();
  for (let n of nums) {
    if (Number.isFinite(n)) set.add(n);
  }
  return [...set].reduce((a, b) => a + b, 0);
}

// 2) Seleccionar propiedades
function pick(obj, keys) {
  const res = {};
  for (let k of keys) {
    if (k in obj) res[k] = obj[k];
  }
  return res;
}

// 3) Agrupar por clave o función
function groupBy(list, keyOrFn) {
  const res = {};
  for (let item of list) {
    const key = typeof keyOrFn === "function" ? keyOrFn(item) : item[keyOrFn];
    if (!res[key]) res[key] = [];
    res[key].push(item);
  }
  return res;
}

// 4) Ordenar por múltiples campos
function sortByMany(list, specs) {
  return [...list].sort((a, b) => {
    for (let { key, dir } of specs) {
      if (a[key] < b[key]) return dir === "asc" ? -1 : 1;
      if (a[key] > b[key]) return dir === "asc" ? 1 : -1;
    }
    return 0;
  });
}

// 5) deepEqual (objetos/arrays simples)
function deepEqual(a, b) {
  if (a === b) return true;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let k of keysA) {
      if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
  }
  return false;
}

// 6) Validador de paréntesis
function isBalanced(s) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  for (let c of s) {
    if ("([{".includes(c)) stack.push(c);
    else if (")]}".includes(c)) {
      if (stack.pop() !== pairs[c]) return false;
    }
  }
  return stack.length === 0;
}

// 7) Frecuencia de palabras
function wordFreq(text) {
  const map = new Map();
  const clean = text.toLowerCase().replace(/[.,:;!?]/g, "");
  for (let w of clean.split(/\s+/)) {
    if (w) map.set(w, (map.get(w) || 0) + 1);
  }
  return map;
}

// 9) Debounce
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 10-A) withTimeout
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout")), ms);
    promise.then(
      (val) => {
        clearTimeout(timer);
        resolve(val);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

// 10-B) allSettledLite
function allSettledLite(promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason })
      )
    )
  );
}

// ---------------- PRUEBAS ----------------
console.log("1) sumUnique:", sumUnique([1, 2, 2, 3])); // 6
console.log("2) pick:", pick({ a: 1, b: 2, c: 3 }, ["a", "c", "z"])); // {a:1, c:3}
console.log(
  "3) groupBy:",
  groupBy([6, 7, 8, 9], (n) => (n % 2 ? "impar" : "par"))
);
console.log(
  "4) sortByMany:",
  sortByMany(
    [
      { lastName: "Perez", age: 30 },
      { lastName: "Gomez", age: 25 },
      { lastName: "Perez", age: 20 },
    ],
    [
      { key: "lastName", dir: "asc" },
      { key: "age", dir: "desc" },
    ]
  )
);
console.log("5) deepEqual:", deepEqual({ x: [1, 2] }, { x: [1, 2] })); // true
console.log("6) isBalanced:", isBalanced("([]{})")); // true
console.log("7) wordFreq:", Object.fromEntries(wordFreq("Hola, hola! chau.")));

// Ejemplo debounce (se ve mejor en navegador, pero funciona en Node)
const debounced = debounce((msg) => console.log("Debounced:", msg), 1000);
debounced("Primero");
debounced("Segundo"); // solo este se ejecutará

// Ejemplo withTimeout y allSettledLite
const ok = () => Promise.resolve("ok!");
const fail = () => Promise.reject("error");

(async () => {
  try {
    const res1 = await withTimeout(ok(), 1000);
    console.log("withTimeout:", res1);
  } catch (e) {
    console.error("withTimeout error:", e);
  }

  const res2 = await allSettledLite([ok(), fail()]);
  console.log("allSettledLite:", res2);
})();
