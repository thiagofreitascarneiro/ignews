import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Posts, { getStaticProps, Post } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/stripe')

const posts = [
    {
        slug: 'fake-slug',
        title: 'Fake title 1',
        excerpt: 'Fake excerpt 1',
        updatedAt: '2020-01-01',
    }
] as Post[];

jest.mock('../../services/prismic')

describe('Posts page', () => {

    it('renders correctly', () => {
        render(<Posts posts={posts} />);

        expect(screen.getByText('Fake title 1')).toBeInTheDocument();
    });

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient);

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
              results: [
                {
                  uid: 'fake-slug',
                  data: {
                    title: [
                      {
                        type: 'heading', text: 'Fake title 1'
                      }
                    ],
                    content: [
                      {
                        type: 'paragraph',
                        text: 'Fake excerpt 1',
                      },
                    ],
                  },
                  last_publication_date: '01-01-2020',
                },
              ],
            }),
          } as any);

        const response = await getStaticProps({
            previewData: undefined,
        });

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [
                        {
                            slug: 'fake-slug',
                            title: 'Fake title 1',
                            excerpt: 'Fake excerpt 1',
                            updatedAt: '01 de janeiro de 2020',
                        }
                    ]
                }
            })
        )
    });
});