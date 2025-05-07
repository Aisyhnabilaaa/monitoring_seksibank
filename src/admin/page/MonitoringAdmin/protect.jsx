import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children, allowedRole = [] }) => {
  const navigate = useNavigate()
  const userData = localStorage.getItem('role')

  useEffect(() => {
    if (!allowedRole.includes(userData)) {
      navigate('/')
    }
  }, [navigate, allowedRole, userData])

  return <>{children}</>
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole: PropTypes.arrayOf(PropTypes.string).isRequired
}
