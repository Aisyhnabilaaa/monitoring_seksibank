import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const NotifikasiUserPage = () => {
  const [notifications, setNotifications] = useState([])
  const [notifCount, setNotifCount] = useState(0) // 🟢 tambahkan state notifCount
  const userId = localStorage.getItem('id')

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://layananbank-production.up.railway.app/api/notifikasi/${userId}`
        )
        console.log('Data notifikasi:', res.data) // debugz`
        setNotifications(res.data)

        // hitung notif yang belum dibaca untuk notifCount
        const unreadCount = res.data.filter(n => n.status === 'unread').length
        setNotifCount(unreadCount)
      } catch (err) {
        console.error('Error fetching notifikasi:', err)
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 10000)
    return () => clearInterval(interval)
  }, [userId]) // 🟢 tambahkan dependency array kosong biar hanya jalan sekali

  const handleNotifClick = async id => {
    try {
      // request PATCH ke backend untuk ubah status notif
      await axios.patch(`http://localhost:3000/notifikasi/read/${id}`)

      // update state lokal biar status notif langsung berubah
      setNotifications(prev => {
        const updated = prev.map(n =>
          n.id === id ? { ...n, status: 'read' } : n
        )
        const unreadCount = updated.filter(n => n.status === 'unread').length
        setNotifCount(unreadCount)
        return updated
      })
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  const handleDeleteAllNotifications = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        await axios.delete('http://localhost:3000/notifikasi/deleteall')
        setNotifications([]) // Clear notifications
        setNotifCount(0) // Reset count
        Swal.fire(
          'Deleted!',
          'Your notifications have been deleted.',
          'success'
        )
      } catch (err) {
        console.error('Error deleting all notifications:', err)
        Swal.fire('Error', 'Gagal menghapus notifikasi.', 'error')
      }
    }
  }

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>
          📩 Notifikasi{' '}
          {notifCount > 0 && (
            <span className='badge bg-danger'>{notifCount}</span>
          )}
        </h2>
        {/* Tombol Hapus Semua di kanan */}
        <button
          className='btn btn-danger'
          style={{ marginTop: '20px' }}
          onClick={handleDeleteAllNotifications}
        >
          Hapus Semua Notifikasi
        </button>
      </div>
      {notifications.length > 0 ? (
        <div className='d-flex flex-column gap-3'>
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`alert ${
                notif.status === 'unread' ? 'alert-primary' : 'alert-secondary'
              } shadow-sm`}
              onClick={() => handleNotifClick(notif.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className='d-flex justify-content-between'>
                <div>
                  <strong>
                    {notif.status === 'unread' ? '🔔 Baru' : '✅ Dibaca'}
                  </strong>
                  <p className='mb-0'>{notif.message}</p>
                </div>
                <small className='text-muted'>
                  {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                  ,{' '}
                  {new Date(notif.createdAt).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada notifikasi.</p>
      )}
    </div>
  )
}

export default NotifikasiUserPage
