import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Posts, { getStaticProps, Post } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';


const posts = [
    { 
        slug: 'fake-slug',
        title: 'Fake title 1',
        excerpt: 'Fake excerpt 1',
        updatedAt: '2020-01-01',
    }
] as Post[];

jest.mock('../../services/prismic', () => {
    return {
      client: {
        getAllByType: jest.fn(),
      },
    };
  });

  describe("Posts page", () => {
    it("renders correctly", () => {
      render(<Posts posts={posts} />);
      const getPrismicClientMocked = mocked(getPrismicClient);
      getPrismicClientMocked.mockReturnValueOnce({
        getAllByType: jest.fn().mockResolvedValueOnce(
            [
                {
                    uid: 'fake-slug',
                    data: {
                        title: 'Fake title 1',
                        content: [
                            {
                                type: 'paragraph',
                                text: 'Fake excerpt 1',
                            },
                        ],
                    },
                    last_publication_date: '2020-01-01',
                },
            ],
        ),
    } as any);
      expect(screen.getByText("Fake title 1")).toBeInTheDocument();
    });

    it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce([
      {
        uid: "fake-slug",
        data: {
          title: [
            {
              type: "heading1",
              text: "Fake title 1",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Fake excerpt 1",
            },
          ],
        },
        last_publication_date: "2022-04-22T03:00:00.000Z",
      },
    ] as any);

    const response = await getStaticProps({ previewData: undefined });


    expect(response).toEqual(
      expect.objectContaining({
        props: {
          data: [
            {
              slug: "fake-slug",
              title: "Fake title 1",
              excerpt: "Fake excerpt 1",
              updatedAt: "01 de janeiro de 2020",
            },
          ],
        },
      })
    );
  });
});