import { Link } from 'react-router-dom';
import '../../../styles/layouts/hero.scss';
import useStatistics from '../../hooks/useStatistics';

import CountUp from '../shared/CountUp';

import Paralax from '../../utils/Paralax';
import FloatingTerminal from '../shared/Terminal';
import { useEffect, useRef } from 'react';

export default function Hero(){
  const { activeProjects, activeTasks, completedTasks } = useStatistics();

  const terminal = useRef(null);
  useEffect(() => Paralax([terminal.current]), [terminal]);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">Focus on What Matters</h1>
            <p className="hero__subtitle">Your entire workflow, synchronized</p>
            <Link className="hero__btn btn btn--filled" to="/projects/new">Create New Project [+]</Link>

            <div className="hero__statistics hero-statistics">
              <h2 className="hero-statistics__title">Your Dashboard Overview</h2>
              <div className="hero-statistics__items">

                <div className="hero-statistics__item">
                  <h3 className="hero-statistics__item-title">Active Projects</h3>
                  <CountUp className="hero-statistics__item-value" target={activeProjects.length} />
                </div>
                <div className="hero-statistics__item">
                  <h3 className="hero-statistics__item-title">Tasks In Progress</h3>
                  <CountUp className="hero-statistics__item-value" target={activeTasks.length} />
                </div>
                <div className="hero-statistics__item">
                  <h3 className="hero-statistics__item-title">Completed Tasks</h3>
                  <CountUp className="hero-statistics__item-value" target={completedTasks.length} />
                </div>

              </div>
            </div>
          </div>
          <div className="hero__media">
            <FloatingTerminal ref={terminal}/>
          </div>
        </div>
      </div>
    </section>
  )
}