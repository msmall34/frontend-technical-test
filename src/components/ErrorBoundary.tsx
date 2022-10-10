import React from 'react'
import Image from 'next/image'
import styles from '../styles/ErrorManager.module.css'
import Logo from '../assets/lbc-logo.webp'

interface State {
  hasError: boolean
}

interface Props {
  children
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      return { hasError: true }
    }
    reload() {
      this.setState({ hasError: false })
      window.location.reload()
    }
    componentDidCatch(error, errorInfo) {
      console.log({ error, errorInfo })
    }
    render() {
      if (this.state.hasError) {
        const mailLink = `mailto:murielpaule.small@gmail.com?subject=${encodeURIComponent("Erreur sur l'Application conversation")}`
        return (
          <div className={styles.wrapper}>
            <Image className={styles.image} src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} layout="fixed" />
            <h2>Oups! Une erreur est survenue!</h2>
            <p>
              Vous pouvez essayer de 
              <a className={styles.reload} onClick={() => this.reload()}>
                  recharger la page
              </a>.
                Si le problème persiste, <a className={styles.contact} href={mailLink}>contactez-nous</a>.
            </p>

          </div>
        )
      }
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary