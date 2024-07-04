Here are some reusable code snippets that might be helpful for your advanced ReactJS hackathon:

### 1. **Custom Hook for Fetching Data**
```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

### 2. **Debounce Hook**
```javascript
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```

### 3. **Throttle Hook**
```javascript
import { useRef, useEffect } from 'react';

const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);

  useEffect(() => {
    const handler = () => {
      const now = new Date().getTime();
      if (now - lastCall.current >= delay) {
        callback();
        lastCall.current = now;
      }
    };

    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [callback, delay]);
};

export default useThrottle;
```

### 4. **Theme Context for Dark Mode**
```javascript
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### 5. **Responsive Design Hook**
```javascript
import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
```

### 6. **Dynamic Import for Code Splitting**
```javascript
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);

export default App;
```

### 7. **Form Validation Hook with Yup**
```javascript
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validate = async () => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        setErrors({});
      } catch (err) {
        const formattedErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    };

    validate();
  }, [values, validationSchema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, errors, handleChange };
};

export default useForm;

// Usage
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const FormComponent = () => {
  const { values, errors, handleChange } = useForm({ name: '', email: '' }, schema);

  return (
    <form>
      <input name="name" value={values.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
};
```

These snippets can serve as a foundation for more complex components and functionalities in your React application. Let me know if you need any specific implementations or additional snippets!