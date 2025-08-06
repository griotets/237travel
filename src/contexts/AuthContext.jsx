import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('enjoytravel_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Test users for different roles
      const testUsers = {
        'admin@enjoytravel.cm': {
          id: 'admin1',
          email: 'admin@enjoytravel.cm',
          name: 'Admin EnjoyTravel',
          role: 'admin',
          phone: '+237 699 123 456',
          joinDate: '2023-01-01T00:00:00.000Z',
          avatar: 'https://ui-avatars.com/api/?name=Admin+EnjoyTravel&background=dc2626&color=fff'
        },
        'user@test.cm': {
          id: 'user1',
          email: 'user@test.cm',
          name: 'Utilisateur Test',
          role: 'user',
          phone: '+237 677 987 654',
          joinDate: '2023-06-15T00:00:00.000Z',
          avatar: 'https://ui-avatars.com/api/?name=Utilisateur+Test&background=7c3aed&color=fff'
        },
        'agency@touristique.cm': {
          id: 'agency1',
          email: 'agency@touristique.cm',
          name: 'Touristique Express',
          role: 'agency',
          phone: '+237 696 247 916',
          joinDate: '2023-03-10T00:00:00.000Z',
          avatar: 'https://ui-avatars.com/api/?name=Touristique+Express&background=f97316&color=fff'
        }
      }

      let mockUser = testUsers[email]

      if (!mockUser) {
        // Create a default user if not in test users
        mockUser = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          role: 'user',
          phone: '+237 6XX XXX XXX',
          joinDate: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${email}&background=7c3aed&color=fff`
        }
      }

      setUser(mockUser)
      localStorage.setItem('enjoytravel_user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        joinDate: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=7c3aed&color=fff`
      }
      
      setUser(newUser)
      localStorage.setItem('enjoytravel_user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('enjoytravel_user')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('enjoytravel_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
