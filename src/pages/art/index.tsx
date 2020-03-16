import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '~/components/Layout'
import PageWrapper from '~/components/PageWrapper'

const Art = styled.div`
  column-count: 2;
  column-gap: 1em;

  @media (max-width: 700px) {
    column-count: 1;
    column-gap: 0;
  }
`

const ProjectWrapper = styled.div`
  margin: 0 0 2em;
  break-inside: avoid;
  display: inline-block;
  width: 100%;
`

// By using positon: relative we define the limit of the overflowing link
const ImageTitleWrapper = styled.div`
  position: relative;
`

const Title = styled.h3`
  margin: 0;
`

const Description = styled.p`
  font-size: smaller;
  margin: 0;
`

const ToolsUsed = styled.span`
  color: var(--gray);
  font-size: smaller;
  display: inline-block;
  margin-bottom: 1rem;
`

const IndexPage: React.FunctionComponent<{
  data: any // type checked by GraphQL
  location: {
    pathname: string
  }
}> = ({
  data: {
    allMarkdownRemark: { edges }
  },
  location: { pathname }
}) => {
  const relevantPosts = edges.filter((post: any) =>
    post.node.fields.slug.startsWith('/projects/')
  )

  return (
    <Layout pathname={pathname}>
      <PageWrapper>
        <Art>
          {relevantPosts.map(
            (
              {
                node: {
                  id,
                  frontmatter: { featuredImage, title, tools, intro },
                  fields: { slug }
                }
              }: any /* type checked by GraphQL */
            ) => {
              return (
                <ProjectWrapper key={id}>
                  <ImageTitleWrapper>
                    <Img
                      placeholderStyle={{}}
                      fadeIn={false}
                      sizes={{
                        ...featuredImage.childImageSharp.sizes,
                        base64: featuredImage.childImageSharp.sqip.dataURI
                      }}
                    />
                    <Title>{String(title)}</Title>
                  </ImageTitleWrapper>
                  <ToolsUsed>{tools}</ToolsUsed>
                  <Description>{intro}</Description>
                </ProjectWrapper>
              )
            }
          )}
        </Art>
      </PageWrapper>
    </Layout>
  )
}

export default IndexPage

export const projectQuery = graphql`
  query ArtOverviewQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tools
            templateKey
            intro
            featuredImage {
              childImageSharp {
                sqip(numberOfPrimitives: 24, blur: 0, width: 256) {
                  dataURI
                  svg
                }
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
