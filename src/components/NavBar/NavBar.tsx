type NavBarProps = {
    title: string
}

export const NavBar = (props: NavBarProps) => {

    const {
        title
    } = props;

    return(
        <div className="navBar">
            <div className="">{title}</div>
        </div>
    )
}