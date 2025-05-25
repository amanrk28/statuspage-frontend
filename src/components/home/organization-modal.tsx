import { useCreateOrganization } from "@/queries/organizations";
import { useState } from "react";
import { Card } from "../ui/card";
import { X, Loader2 } from "lucide-react";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const OrganizationModal = ({ isOpen, onClose }) => {
  const { loginWithPopup } = useAuth0();
  const navigate = useNavigate();

  const { mutate: createOrganization, isPending } = useCreateOrganization();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.organizationName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    createOrganization({
      org_name: formData.organizationName,
      email_id: formData.email,
      password: formData.password
    }, {
      onSuccess: () => {
        toast.success("Organization created successfully");
        onClose();
        navigate('/services');
      },
      onError: () => {
        toast.error("Failed to create organization");
      }
    })
  };

  const handleLogin = () => {
    loginWithPopup();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Organization
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Organization Name</label>
                <Input
                  placeholder="Your Company"
                  value={formData.organizationName}
                  onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                />
              </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Organization"}
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={handleLogin} className="text-blue-600 hover:underline font-medium">
                  Sign in
                </button>
              </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
