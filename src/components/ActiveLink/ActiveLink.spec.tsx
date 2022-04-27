import { render } from '@testing-library/react'
import { ActiveLink } from '.'

test('active link renders correctly', () => {
    const { debug } = render(
        <ActiveLink activeClassName="active" href="/">
            <a>Home</a>
        </ActiveLink>
    )

    debug()
})