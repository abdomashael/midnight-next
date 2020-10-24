import {useState, useEffect} from "react";
import {
    Navbar,
    Nav, NavLink,
} from "react-bootstrap";

import cssClasses from "./navbar.module.css";
import Logo from "../../components/logo/logo";
import cx from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";

const CustomNavbar = () => {
    const [scrolled, setScrolled] = useState(false);

    let router = useRouter();
    let scrollHandler = function () {
        console.log("aaaaaaaaaaaaaaaaaaaaa")

        if (window.pageYOffset >= 100) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        document.addEventListener("scroll",scrollHandler)
        return ()=>document.removeEventListener('scroll',scrollHandler)
    }, );

    return (
        <Navbar className={cx("fixed-top", scrolled ? cssClasses.dark : cssClasses.transparent)} expand="lg"
                variant={"dark"}>
            <Navbar.Brand>
                <NavLink>
                    <Link
                        className={cx("nav-link",cssClasses.link,router.pathname === "/" ? "active" :"")}
                        href="/"
                    >
                        <Logo/>
                    </Link>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={"mr-auto"}>
                    <Link
                        href="/"
                    >
                        <span className={cx("nav-link",cssClasses.link,router.pathname === "/" ? "active" :"")}  >Home</span>
                    </Link>
                    <Link
                        href={"/movies"}
                    >
                        <span className={cx("nav-link",cssClasses.link,router.pathname === "/movies" ? "active" :"")}>Movies</span>
                    </Link>
                    <Link href={"/series"}>
                        <span className={cx("nav-link",cssClasses.link,router.pathname === "/series" ? "active" :"")}>Series</span>
                    </Link>
                    {/*<Link className="nav-link" href="/series">*/}
                    {/*    Kids*/}
                    {/*</Link>*/}
                    {/* <Nav.Link href="#link3">مباشر</Nav.Link> */}
                </Nav>

                {/*hide on production*/}

                {/*<Nav.Link className="pb-0" href="#link2">*/}
                {/*    <FontAwesomeIcon icon={faSearch} inverse/>*/}
                {/*</Nav.Link>*/}
                {/*<Link className="nav-link" href="/auth?type=login">*/}
                {/*    Login*/}
                {/*</Link>*/}

                {/*<Link*/}
                {/*    href="/auth/type=signup"*/}
                {/*    id="btn"*/}
                {/*    className={cx(cssClasses.button, "nav-link")}*/}
                {/*>*/}
                {/*    Sign up*/}
                {/*</Link>*/}
            </Navbar.Collapse>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        </Navbar>
    );
};

export default CustomNavbar;
