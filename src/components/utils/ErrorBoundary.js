import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '', error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has occurred
    return { hasError: true, errorMessage: error.message, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    // Reset the error state to allow retrying
    this.setState({ hasError: false, errorMessage: '', error: null });
  };

  render() {
    if (this.state.hasError) {
      // Check if it's a ChunkLoadError and display specific message
      const isChunkLoadError =
        this.state.errorMessage.includes('ChunkLoadError');

      return (
        <div className="error-boundary-fallback">
          <h3>Something went wrong.</h3>
          {isChunkLoadError ? (
            <>
              <p>It seems like some resources failed to load.</p>
              <p>Check your internet connection and try again.</p>
              <button onClick={this.handleRetry}>Retry</button>
            </>
          ) : (
            <p>Please try again later.</p>
          )}
        </div>
      );
    }

    // Render children if no error is caught
    return this.props.children;
  }
}

export default ErrorBoundary;
