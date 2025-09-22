"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import {
  Camera,
  User,
  Mail,
  Globe,
  ImageIcon,
  Save,
  Sparkles,
  Palette,
  Upload,
  X,
  Trash2,
  LogOut,
  HelpCircle,
  Shield,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name || "",
    bio: user.bio || "",
    avatarUrl: user.avatarUrl || "",
    coverImageUrl: "",
    isPublic: true,
  });

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublic: checked }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview before uploading
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatarPreview(result); // For preview
    };
    reader.readAsDataURL(file);

    try {
      // Upload to EdgeStore
      const data = edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress); // Optionally, setProgress(progress) for UI
        },
      });

      toast.promise(data, {
        loading: "Uploading avatar...",
        success: "Avatar uploaded successfully",
        error: "Error uploading avatar",
      });

      const res = await data;

      // Save the uploaded file's URL instead of Base64
      setFormData((prev) => ({ ...prev, avatarUrl: res.url }));

      console.log("Upload successful:", res.url);
      setLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview before uploading
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCoverPreview(result); // For preview only
    };
    reader.readAsDataURL(file);

    try {
      // Upload to EdgeStore
      const data = edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress); // Optional: setCoverUploadProgress(progress)
        },
      });

      toast.promise(data, {
        loading: "Uploading cover image...",
        success: "Cover image uploaded successfully",
        error: "Error uploading cover image",
      });
      const res = await data;
      // Save only the final uploaded URL in DB, not Base64
      setFormData((prev) => ({ ...prev, coverImageUrl: res.url }));

      console.log("Cover upload successful:", res.url);
      setLoading(false);
    } catch (error) {
      console.error("Cover upload failed:", error);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview("");
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const removeCover = () => {
    setCoverPreview("");
    setFormData((prev) => ({ ...prev, coverImageUrl: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log("Updated Details:", formData);

    // Update user details in the database

    setLoading(false);
    // Call API to update user details here
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion confirmed");
    // Call API to delete account
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    console.log("User logged out");
    // Call logout API and redirect
  };

  const handleHelp = () => {
    console.log("Opening help center");
    // Redirect to help center or open help modal
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Preview Card - Left side on desktop */}
          <div className="w-full lg:w-1/3">
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-muted/20 sticky top-8">
              {(coverPreview || formData.coverImageUrl) && (
                <div className="relative h-32 bg-gradient-to-r from-primary/20 to-accent/20">
                  <img
                    src={coverPreview || formData.coverImageUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardContent className="relative p-6 lg:p-8">
                <div className="flex flex-col items-center space-y-6">
                  {/* Avatar Section */}
                  <div className="relative group">
                    <Avatar className="h-24 w-24 lg:h-32 lg:w-32 border-4 border-white shadow-xl ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                      <AvatarImage
                        src={
                          avatarPreview ||
                          formData.avatarUrl ||
                          `https://avatar.iran.liara.run/username?username=${
                            formData.displayName || "User"
                          }`
                        }
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl lg:text-2xl font-bold">
                        {formData.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-accent p-2 shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Camera className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center space-y-3 w-full">
                    <div className="space-y-1">
                      <p className="text-xl lg:text-2xl font-bold text-foreground text-balance">
                        {formData.displayName || "Your Display Name"}
                      </p>
                      <p className="text-muted-foreground">
                        @{formData.username || "username"}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground text-balance">
                      {formData.bio || "Tell the world about yourself..."}
                    </p>

                    {/* Status Badges */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      <Badge
                        variant="secondary"
                        className="bg-accent/20 text-accent-foreground border-accent/30"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Creator
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary"
                      >
                        <Globe className="h-3 w-3 mr-1" />
                        {formData.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Form - Right side on desktop */}
          <div className="w-full lg:w-2/3">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Personal Information
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Update your profile details
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="username"
                            className="text-sm font-medium text-foreground flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            Username
                          </Label>
                          <Input
                            id="username"
                            name="username"
                            readOnly
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="your-username"
                            className="bg-input border-border/50   transition-all duration-200"
                            //  focus:ring-primary/20 focus:border-primary
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="displayName"
                            className="text-sm font-medium text-foreground flex items-center gap-2"
                          >
                            <User className="h-4 w-4 text-muted-foreground" />
                            Display Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your  Name"
                            className="bg-input border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="bio"
                          className="text-sm font-medium text-foreground flex items-center gap-2"
                        >
                          <Palette className="h-4 w-4 text-muted-foreground" />
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Share something interesting about yourself..."
                          className="bg-input border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200 min-h-[100px] resize-none"
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Media & Images
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Upload your profile images
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                        {/* Avatar Upload */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Camera className="h-4 w-4 text-muted-foreground" />
                            Avatar Image
                          </Label>
                          <div className="space-y-3">
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                                id="avatar-upload"
                              />
                              <Label
                                htmlFor="avatar-upload"
                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/30"
                              >
                                {avatarPreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={avatarPreview || "/placeholder.svg"}
                                      alt="Avatar preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      className="absolute top-2 right-2 h-6 w-6 p-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeAvatar();
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                      Click to upload avatar
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      PNG, JPG up to 5MB
                                    </p>
                                  </div>
                                )}
                              </Label>
                            </div>
                          </div>
                        </div>

                        {/* Cover Image Upload */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            Cover Image
                          </Label>
                          <div className="space-y-3">
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleCoverUpload}
                                className="hidden"
                                id="cover-upload"
                              />
                              <Label
                                htmlFor="cover-upload"
                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/30"
                              >
                                {coverPreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={coverPreview || "/placeholder.svg"}
                                      alt="Cover preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      className="absolute top-2 right-2 h-6 w-6 p-0"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeCover();
                                      }}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                      Click to upload cover
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      PNG, JPG up to 5MB
                                    </p>
                                  </div>
                                )}
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Privacy Settings
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Control who can see your profile
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30">
                        <div className="space-y-1">
                          <Label
                            htmlFor="publicProfile"
                            className="text-sm font-medium text-foreground"
                          >
                            Public Profile
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Make your profile visible to everyone
                          </p>
                        </div>
                        <Switch
                          id="publicProfile"
                          checked={formData.isPublic}
                          onCheckedChange={handleToggle}
                          className="data-[state=checked]:bg-primary"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 flex items-center  justify-end">
                      <Button
                        disabled={loading}
                        type="submit"
                        className="w-[40%] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-8">
                    {/* Account Management Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div className="rounded-lg bg-orange-500/10 p-2">
                          <Settings className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            Account Management
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Manage your account settings and actions
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Help Button */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-500/10 p-2">
                              <HelpCircle className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                Help & Support
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Get help with your account and features
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleHelp}
                            className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 bg-transparent"
                          >
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Get Help
                          </Button>
                        </div>

                        {/* Logout Button */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-yellow-500/10 p-2">
                              <LogOut className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                Sign Out
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Sign out of your account on this device
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleLogout}
                            className="border-yellow-200 dark:border-yellow-800 hover:bg-yellow-50 dark:hover:bg-yellow-950/30 bg-transparent"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>

                        {/* Delete Account Button with Confirmation Dialog */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-red-500/10 p-2">
                              <Trash2 className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                Delete Account
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all data
                              </p>
                            </div>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                  <Shield className="h-5 w-5" />
                                  Delete Account Confirmation
                                </AlertDialogTitle>
                                <AlertDialogDescription className="space-y-2">
                                  <p>
                                    Are you absolutely sure you want to delete
                                    your account?
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    all your data from our servers.
                                  </p>
                                  <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800/30 mt-4">
                                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                      All of the following will be permanently
                                      deleted:
                                    </p>
                                    <ul className="text-sm text-red-700 dark:text-red-300 mt-2 space-y-1">
                                      <li>
                                        • Your profile and personal information
                                      </li>
                                      <li>• All uploaded images and media</li>
                                      <li>
                                        • Account settings and preferences
                                      </li>
                                      <li>• Any associated data and history</li>
                                    </ul>
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteAccount}
                                  className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                >
                                  Yes, Delete My Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
