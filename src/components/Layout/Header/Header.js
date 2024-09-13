import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ contact }) {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('describe')}>
                <div className={cx('name')}>Dịch vụ CSKH Demo</div>
                <div className={cx('contact')}>Liên hệ: {contact}</div>
            </div>
            <div className={cx('logo')}>
                <img
                    src="https://static.topcv.vn/company_logos/QvZsoinLOkPfxyYMtWzyn2gQUDWdlSwb_1684824787____01afbdb39a80b5abc56a64b80d4cefd1.png"
                    alt="Công ty Cổ phần Công nghệ KiotViet"
                />
            </div>
        </header>
    );
}

export default Header;
