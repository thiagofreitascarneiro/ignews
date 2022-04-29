import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

// screen uma forma mais facil de verificar se um componente está em tela, posso usar screen ao ivés de desetruturar.

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {

    it('renders correctly', () => {
       render(
            <ActiveLink activeClassName="active" href="/">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('adds active class if the link as currently', () => {
        render(
            <ActiveLink activeClassName="active" href="/">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toHaveClass('active')
    })

})

