import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const formatChapterTitle = title =>
  title
    .split('_')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');

const Chapter = ({ chapter, children }) => (
  <ChapterUL>
    <ChapterLI key={chapter.id}>
      <ChapterTitle>{formatChapterTitle(chapter.title)}</ChapterTitle>
    </ChapterLI>
    <ChapterLI>
      <SubchapterUL>{children}</SubchapterUL>
    </ChapterLI>
  </ChapterUL>
);

const Subchapter = ({ subchapter, children }) => (
  <React.Fragment>
    <SubchapterLI>
      <SubchapterTitle>{formatChapterTitle(subchapter.title)}</SubchapterTitle>
    </SubchapterLI>
    <SubchapterLI>
      <SectionUL>{children}</SectionUL>
    </SubchapterLI>
  </React.Fragment>
);

const Section = ({ section }) => (
  <SectionLI key={section.id}>
    <Link to={section.childMarkdownRemark.fields.slug}>
      <SectionTitle>
        {section.childMarkdownRemark.frontmatter.title}
      </SectionTitle>
    </Link>
  </SectionLI>
);

class TableOfContents extends React.Component {
  render() {
    const chapters = this.props.posts.chapters;
    return (
      <TableOfContentsContainer>
        {chapters.map(chapter => (
          <Chapter chapter={chapter}>
            {chapter.subchapters.map(subchapter => (
              <Subchapter subchapter={subchapter}>
                {subchapter.sections.map(({ post }) => (
                  <Section section={post} />
                ))}
              </Subchapter>
            ))}
          </Chapter>
        ))}
      </TableOfContentsContainer>
    );
  }
}

export default TableOfContents;

const TableOfContentsContainer = styled.ul`
  padding: ${props => props.theme.sitePadding};
  list-style: none;
  margin: 0;
`;

const BaseUL = styled.ul`
  list-style: none;
`;

const ChapterUL = BaseUL.extend``;

const ChapterLI = styled.li``;

const ChapterTitle = styled.h4`
  font-weight: 200;
  font-size: 2.8rem;
  color: ${props => props.theme.brand};
  margin-bottom: 10px;
`;

const SubchapterUL = BaseUL.extend``;

const SubchapterLI = styled.li``;

const SubchapterTitle = styled.h5`
  font-weight: 600;
  color: black;
  margin-bottom: 5px;
`;

const SectionUL = styled.ul`
  list-style: none;
`;

const SectionLI = styled.li``;

const SectionTitle = styled.h6`
  font-weight: 200;
  margin-top: 5px;
  margin-bottom: 5px;
  color: black;
`;
