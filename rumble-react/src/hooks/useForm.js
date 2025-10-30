/**
 * useForm Hook
 * Custom hook for form state management and validation
 */
import { useState, useCallback } from 'react';
import { isValidEmail, validatePassword } from '../utils';

const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  }, [errors]);

  // Handle input blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    validateField(name, values[name]);
  }, [values, validateField]);

  // Validate individual field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    let error = null;

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      error = `${rules.label || name} is required`;
    }
    
    // Email validation
    else if (rules.type === 'email' && value && !isValidEmail(value)) {
      error = 'Please enter a valid email address';
    }
    
    // Password validation
    else if (rules.type === 'password' && value) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        error = passwordValidation.errors[0];
      }
    }
    
    // Min length validation
    else if (rules.minLength && value && value.length < rules.minLength) {
      error = `${rules.label || name} must be at least ${rules.minLength} characters`;
    }
    
    // Max length validation
    else if (rules.maxLength && value && value.length > rules.maxLength) {
      error = `${rules.label || name} must be no more than ${rules.maxLength} characters`;
    }
    
    // Pattern validation
    else if (rules.pattern && value && !rules.pattern.test(value)) {
      error = rules.message || `${rules.label || name} format is invalid`;
    }
    
    // Custom validation
    else if (rules.validate && value) {
      const customError = rules.validate(value, values);
      if (customError) {
        error = customError;
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));

    return error;
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, values, validateField]);

  // Reset form
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();
    
    if (isValid && onSubmit) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
    return isValid;
  }, [values, validationRules, validateForm]);

  // Get field props for easy integration
  const getFieldProps = useCallback((name) => ({
    value: values[name] || '',
    error: touched[name] ? errors[name] : null,
    onChange: (e) => handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
    isValid: Object.keys(errors).length === 0,
  };
};

export default useForm;