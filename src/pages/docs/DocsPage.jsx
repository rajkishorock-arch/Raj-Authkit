import { useRouter } from '../../router/index.jsx'
import { DocsLayout } from '../../components/docs/DocsLayout.jsx'
import { IntroContent, introHeadings } from './content/IntroContent.jsx'
import { InstallationContent, installationHeadings } from './content/InstallationContent.jsx'
import { FirebaseSetupContent, firebaseHeadings } from './content/FirebaseSetupContent.jsx'
import { QuickStartContent, quickStartHeadings } from './content/QuickStartContent.jsx'
import { SignupContent, signupHeadings } from './content/SignupContent.jsx'
import { LoginContent, loginHeadings } from './content/LoginContent.jsx'
import { LogoutContent, logoutHeadings } from './content/LogoutContent.jsx'
import { UseAuthContent, useAuthHeadings } from './content/UseAuthContent.jsx'
import { ProtectedRouteContent, protectedRouteHeadings } from './content/ProtectedRouteContent.jsx'
import { ComponentsContent, componentsHeadings } from './content/ComponentsContent.jsx'
import { ArchitectureContent, architectureHeadings } from './content/ArchitectureContent.jsx'
import { SecurityContent, securityHeadings } from './content/SecurityContent.jsx'
import { TroubleshootingContent, troubleshootingHeadings } from './content/TroubleshootingContent.jsx'

/**
 * Top-level Documentation Page router and container.
 * Determines the active sub-document based on currentPath.
 */
export function DocsPage() {
  const { currentPath } = useRouter()

  // Match subroutes
  const normalizedPath = currentPath.replace(/\/$/, '')

  switch (normalizedPath) {
    case '/docs/getting-started':
      return (
        <DocsLayout headings={installationHeadings}>
          <InstallationContent />
        </DocsLayout>
      )

    case '/docs/firebase':
      return (
        <DocsLayout headings={firebaseHeadings}>
          <FirebaseSetupContent />
        </DocsLayout>
      )

    case '/docs/quick-start':
      return (
        <DocsLayout headings={quickStartHeadings}>
          <QuickStartContent />
        </DocsLayout>
      )

    case '/docs/signup':
      return (
        <DocsLayout headings={signupHeadings}>
          <SignupContent />
        </DocsLayout>
      )

    case '/docs/login':
      return (
        <DocsLayout headings={loginHeadings}>
          <LoginContent />
        </DocsLayout>
      )

    case '/docs/logout':
      return (
        <DocsLayout headings={logoutHeadings}>
          <LogoutContent />
        </DocsLayout>
      )

    case '/docs/use-auth':
      return (
        <DocsLayout headings={useAuthHeadings}>
          <UseAuthContent />
        </DocsLayout>
      )

    case '/docs/protected-route':
      return (
        <DocsLayout headings={protectedRouteHeadings}>
          <ProtectedRouteContent />
        </DocsLayout>
      )

    case '/docs/components':
      return (
        <DocsLayout headings={componentsHeadings}>
          <ComponentsContent />
        </DocsLayout>
      )

    case '/docs/architecture':
      return (
        <DocsLayout headings={architectureHeadings}>
          <ArchitectureContent />
        </DocsLayout>
      )

    case '/docs/security':
      return (
        <DocsLayout headings={securityHeadings}>
          <SecurityContent />
        </DocsLayout>
      )

    case '/docs/troubleshooting':
      return (
        <DocsLayout headings={troubleshootingHeadings}>
          <TroubleshootingContent />
        </DocsLayout>
      )

    case '/docs':
    case '/docs/introduction':
    default:
      return (
        <DocsLayout headings={introHeadings}>
          <IntroContent />
        </DocsLayout>
      )
  }
}

export default DocsPage
