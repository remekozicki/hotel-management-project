
interface ButtonTutProps {
    children: string;
    color?: 'primary' | 'danger' | 'secondary';
    onClick: () => void;
}

const ButtonTut = ({children, onClick, color}: ButtonTutProps) =>{
    return(
        <button
            type='button'
            className={ 'btn btn-' + color}
            color='secondary'
            onClick={onClick}
        > {children}</button>
    )
}

export default ButtonTut