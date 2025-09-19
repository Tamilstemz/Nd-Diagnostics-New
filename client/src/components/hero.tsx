import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Info, Shield, Users, Clock, Award, Search, Calendar, Edit, X, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import doctorImage from "@assets/newpic1_1749587017199.png";

interface BookingData {
  appointmentDate: string;
  appointmentTime: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  patientName: string;
  bookingReference: string;
  examType: string;
}

interface CountryData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  examType: string;
}

const countriesData: CountryData[] = [
  {
    id: "australia",
    title: "ND Diagnostics",
    subtitle: "",
    description: "ND Lab is a modern diagnostic center dedicated to helping individuals and families complete their visa medical requirements with confidence. With our state-of-the-art facilities and experienced medical professionals, we ensure a smooth, hassle-free process for your visa journey. Beyond visa medicals, we offer a full spectrum of laboratory investigations to support your health and well-being.",
    examType: "Australia Visa Medical Examination"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingType, setTrackingType] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otpAction, setOtpAction] = useState<"reschedule" | "cancel" | null>(null);
  const [otpValue, setOtpValue] = useState("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % countriesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + countriesData.length) % countriesData.length);
  };

  const currentCountry = countriesData[currentSlide];

  const handleTrackBooking = () => {
    // Simulate fetching booking data (replace with actual API call)
    const mockBookingData: BookingData = {
      appointmentDate: "2025-01-28",
      appointmentTime: "10:30 AM",
      status: "confirmed" as const,
      patientName: "John Doe",
      bookingReference: trackingNumber,
      examType: currentCountry.examType
    };
    
    setBookingData(mockBookingData);
    setShowBookingDetails(true);
  };

  const handleReschedule = () => {
    setOtpAction("reschedule");
    setShowOTP(true);
  };

  const handleCancel = () => {
    setOtpAction("cancel");
    setShowOTP(true);
  };

  const handleOTPSubmit = () => {
    if (otpValue.length === 6) {
      if (otpAction === "reschedule") {
        console.log("Reschedule booking for:", bookingData?.bookingReference, "with OTP:", otpValue);
        // Add reschedule logic here
      } else if (otpAction === "cancel") {
        console.log("Cancel booking for:", bookingData?.bookingReference, "with OTP:", otpValue);
        // Add cancel logic here
      }
      
      // Reset states
      setShowOTP(false);
      setOtpAction(null);
      setOtpValue("");
      setIsTrackingOpen(false);
      setShowBookingDetails(false);
      setBookingData(null);
    }
  };

  const handleBackToBookingDetails = () => {
    setShowOTP(false);
    setOtpAction(null);
    setOtpValue("");
  };

  const getStatusColor = (status: BookingData["status"]) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: BookingData["status"]) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <section id="home" className="hero-gradient py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-brand-purple/5 to-brand-teal/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-brand-black">{currentCountry.title}</span><br/>
                <span className="text-brand-orange">{currentCountry.subtitle}</span>
              </h1>
            </div>
            
            <p className="text-xl text-brand-black leading-relaxed">
              {currentCountry.description}
            </p>

            {/* Slide Indicators */}
            <div className="flex justify-center lg:justify-start gap-3">
              {countriesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-brand-orange shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
          </div>
          
          <div className="relative">
            <img
              src={doctorImage}
              alt="Medical professional with equipment"
              className="rounded-2xl shadow-2xl w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-500"
            />
            
          </div>
        </div>
      </div>
    </section>
  );
}
