import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Dễ sử dụng',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus được thiết kế để làm cho việc viết tài liệu và blog dễ dàng, thú vị với chi phí tối thiểu.
        Bạn có thể chia sẻ website của mình hoàn toàn miễn phí với Github Pages, Google Firebase, Netlify hoàn toàn không tốn phí.
      </>
    ),
  },
  {
    title: 'Tập trung vào nội dung',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus cho phép bạn tập trung vào tài liệu của mình mà không phải bận tâm những tác vụ cài đặt nhàm chán. 
        Hãy bắt đầu soạn thảo tài liệu của bạn vào thư mục <code>docs</code>.
      </>
    ),
  },
  {
    title: 'Mạnh mẽ với React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Mở rộng hoặc tùy chỉnh bố cục trang web của bạn với React, sử dụng ChatGPT để tạo ra bố cục giao diện dễ dàng. 
        Docusaurus có thể được mở rộng trong khi tái sử dụng cùng một header (đầu trang) và footer (chân trang).
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
