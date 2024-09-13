import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RatingSelect.module.scss';
import classNames from 'classnames/bind';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import image from '~/assets/image/thanks_submit.png';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function RatingSelect({
    rating,
    setRating,
    current,
    finish,
    data,
    onNext,
    onBack,
    ...props
}) {
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={cx('wrapper')} {...props}>
            <header className={cx('header')}>
                <div className={cx('title')}>Đánh giá dịch vụ</div>
            </header>
            <div className={cx('content')}>
                {data && data[0].nameService ? (
                    <>
                        <div className={cx('name-service')}>
                            {data[0].nameService}
                        </div>
                        <div className={cx('name-staff')}>
                            {data[0].nameStaff}
                        </div>
                    </>
                ) : (
                    <div className={cx('name-service')}>{props.title}</div>
                )}

                {current < 3 && (
                    <div className={cx('stars')}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div
                                key={index}
                                className={cx('star', {
                                    filled: index <= (hoverRating || rating),
                                })}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <FontAwesomeIcon
                                    className={cx('star_index')}
                                    icon={faStar}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {current === 3 && (
                    <input
                        className={cx('input')}
                        value={feedbackText}
                        placeholder="Nhập góp ý"
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                )}

                {current === 4 && (
                    <img
                        className={cx('thanks_submit')}
                        src={image}
                        alt="thanks"
                    />
                )}

                {current < 4 && (
                    <div className={cx('button')}>
                        {!data && (
                            <>
                                {isMobile ? (
                                    <Button
                                        outline
                                        leftIcon={
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                            />
                                        }
                                        onClick={onBack}
                                    />
                                ) : (
                                    <Button
                                        outline
                                        title="Quay lại"
                                        onClick={onBack}
                                    />
                                )}
                            </>
                        )}
                        {!finish ? (
                            <Button
                                primary
                                title="Tiếp tục"
                                className={cx({ large: isMobile })}
                                onClick={onNext}
                            />
                        ) : (
                            <Button
                                primary
                                title="Hoàn thành"
                                className={cx({ large: isMobile })}
                                onClick={() => {
                                    onNext(feedbackText);
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RatingSelect;
