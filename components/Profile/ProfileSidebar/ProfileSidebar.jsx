import React, { useEffect } from "react"
import styles from "./ProfileSidebar.module.css"
import { FaRegUser } from "react-icons/fa"
import { CgHome } from "react-icons/cg"
import { TbLogout } from "react-icons/tb"
import { MdOutlineAddBox, MdOutlineFavoriteBorder } from "react-icons/md"

import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getToken, removeToken } from "../../../features/authSlice/authSlice"

function ProfileSidebar() {
  const router = useRouter()
  const userId = useSelector((state) => state.auth.userId)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    dispatch(getToken())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(removeToken())
  }

  if (token === null) {
    router.push("/")
  }

  return (
    <div className={styles.ProfileSidebar}>
      <div className={styles.sidebar_container}>
        <div className={styles.avatar}>
          <Link href="/">
            <img
              src="https://lasvegas.wpresidence.net/wp-content/themes/wpresidence/img/default-user_1.png"
              alt=""
            />
          </Link>
          <p>Welcome back, Khald!</p>
        </div>
        <div className={styles.sidebar_nav}>
          <Link href={`/profile/${userId}`}>
            <div
              className={
                router.pathname == `/profile`
                  ? styles.side_item_active
                  : styles.side_item
              }
            >
              <FaRegUser className={styles.icon} />
              <p>My Profile</p>
            </div>
          </Link>
          <Link href="/">
            <div
              className={
                router.pathname == "/"
                  ? styles.side_item_active
                  : styles.side_item
              }
            >
              <CgHome className={styles.icon} />
              <p>My Properties List</p>
            </div>
          </Link>
          <Link href={`/profile/properties/${userId}`}>
            <div
              className={
                router.pathname == `/profile/properties/${userId}`
                  ? styles.side_item_active
                  : styles.side_item
              }
            >
              <MdOutlineAddBox className={styles.icon} />
              <p>Add New Property</p>
            </div>
          </Link>
          <Link href="/">
            <div
              className={
                router.pathname == "/"
                  ? styles.side_item_active
                  : styles.side_item
              }
            >
              <MdOutlineFavoriteBorder className={styles.icon} />

              <p>Favorites</p>
            </div>
          </Link>
          <Link href="/profile/bookings">
            <div
              className={
                router.pathname == "/profile/bookings"
                  ? styles.side_item_active
                  : styles.side_item
              }
            >
              <CgHome className={styles.icon} />
              <p>Bookings</p>
            </div>
          </Link>
          <div onClick={handleLogout} className={styles.side_item}>
            <TbLogout className={styles.icon} />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar
