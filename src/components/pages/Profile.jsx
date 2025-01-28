import { motion } from 'framer-motion';

function Profile() {
  return (
    <div className="pt-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark rounded-lg p-8 shadow-lg border border-gray-dark"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text">John Doe</h1>
              <p className="text-text/60">john.doe@example.com</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-darker rounded-lg">
              <h2 className="font-semibold text-text mb-2">Account Settings</h2>
              <p className="text-text/60">Manage your account preferences</p>
            </div>
            
            <div className="p-4 bg-darker rounded-lg">
              <h2 className="font-semibold text-text mb-2">Chat History</h2>
              <p className="text-text/60">View your conversation history</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;