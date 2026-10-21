import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn('[ErrorBoundary] recurso no disponible:', error?.message ?? error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
