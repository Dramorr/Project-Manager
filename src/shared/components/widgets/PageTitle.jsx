import '../../../styles/layouts/page-title.scss';

export default function PageTitle({title}){
  return (
    <section className="page-title">
      

      <div className="container">
        <div className="page-title__inner">
          <span className="blob"></span>
          <span className="blob"></span>
          
          <h1 className="page-title__title">{title}</h1>
        </div>
      </div>
    </section>
  )
}