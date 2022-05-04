
import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/stripe')

const post = {
    slug: 'fake-slug',
    title: 'Fake title 1',
    content: '<p>Fake excerpt 1</p>',
    updatedAt: '2021-01-01',
};

jest.mock("next-auth/react");

jest.mock('../../services/prismic')

describe('Post page', () => {

    it('renders correctly', () => {
        render(<Post post={post} />);

        expect(screen.getByText('Fake title 1')).toBeInTheDocument();
        expect(screen.getByText('Fake excerpt 1')).toBeInTheDocument();
    });

    it('redirects user if no subscription is found', async () => {
        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: null,
        } as any);

        const response = await getServerSideProps({
            params: {
                slug: 'my-new-post',
            },
        } as any);

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/',
                })
            })
        )
    });

    it('loads initial data', async () => {
        const getSessionMocked = mocked(getSession);
        const getPrismicClientMocked = mocked(getPrismicClient);

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
               data: {
                title: [
                    {type: 'heading', text: 'My new post'}
                ],
                content: [
                    { type: 'paragraph', text: 'Post content'}
                ],
            },
            last_publication_date: '01-01-2021'
        })
        } as any);

       getSessionMocked.mockResolvedValueOnce({
           activeSubscription: 'fake-active-subscription'
       } as any)

       const response = await getServerSideProps({
        params: {
            slug: 'my-new-post',
        },
    } as any);

    expect(response).toEqual(
        expect.objectContaining({
            props: {
                post: {
                    slug: 'my-new-post',
                    title: 'My new post',
                    content: '<p>Post content</p>',
                    updatedAt: '01 de janeiro de 2021'
                }
            }
        })
    )
    });
});