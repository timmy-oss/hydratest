const persistenceKey = "hydratest_session_persistence";

export function persistSession(payload) {
  try {
    const serializedPayload = JSON.stringify(payload);
    const key = persistenceKey;

    if (localStorage) {
      localStorage.setItem(key, serializedPayload);
      return true;
    }

    return false;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

export function removeSession() {
  try {
    const key = persistenceKey;

    if (localStorage) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function loadSession() {
  try {
    const key = persistenceKey;

    if (localStorage) {
      const serializedPayload = localStorage.getItem(key);

      if (!serializedPayload) return null;

      const payload = JSON.parse(serializedPayload);

      return payload;
    }

    return null;
  } catch (err) {
    console.log(err.message);

    return null;
  }
}
