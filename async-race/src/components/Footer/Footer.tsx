import React from 'react';
import logo from '../../assets/rs_school.svg';
import s from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.copyright}>2022</p>
      <a className={s.link__github} href='https://github.com/Dauhaliavets' target='_blank' rel='noreferrer'>
        Github
      </a>
      <a className={s.link__course} href='https://rs.school/js/' target='_blank' rel='noreferrer'>
        <img className={s.link__course_logo} src={logo} alt='rs_school-logo' />
      </a>
    </footer>
  );
};

export { Footer };
