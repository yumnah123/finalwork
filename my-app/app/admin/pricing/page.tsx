"use client";
import React, { useState, useEffect } from "react";
import AdminHeader from "@/components/AdminHeader";
import { DollarSign, TrendingUp, Clock, Save, CheckCircle, XCircle, X } from "lucide-react";

type PricingData = {
  baseFare: {
    default: number;
  };
  costPerMile: number;
  costPerMinuteWaiting: number;
  surgeRules: {
    weekdayPeakPercentage: number;
    saturdayPercentage: number;
    sundayPercentage: number;
  };
  peakHours: {
    start: number;
    end: number;
    eveningStart: number;
    eveningEnd: number;
  };
};

type Notification = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

export default function AdminPricingPage() {
  const [data, setData] = useState<PricingData>({
    baseFare: { default: 0 },
    costPerMile: 0,
    costPerMinuteWaiting: 0,
    surgeRules: {
      weekdayPeakPercentage: 0,
      saturdayPercentage: 0,
      sundayPercentage: 0,
    },
    peakHours: {
      start: 7,
      end: 9,
      eveningStart: 17,
      eveningEnd: 19,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const loadPricingData = async () => {
      try {
        const res = await fetch("/api/pricing");
        if (res.ok) {
          const pricingData = await res.json();
          setData(pricingData);
        }
      } catch (err) {
        console.error("Error loading pricing data:", err);
      }
    };

    loadPricingData();
  }, []);

  const savePricingPage = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update pricing page");
      addNotification('success', 'Pricing page updated successfully!');
    } catch (err) {
      console.error(err);
      addNotification('error', 'Error updating pricing page');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AdminHeader/>
      
      
      {/* Notification Container */}
      <div className="fixed top-20 right-6 z-50 space-y-3 max-w-md">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border-2 backdrop-blur-sm animate-slide-in ${
              notification.type === 'success'
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'bg-red-50 border-red-300 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <p className="flex-1 font-medium">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto p-6 pt-32 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Pricing Management</h1>
              <p className="text-slate-600">Configure your service rates and surge pricing</p>
            </div>
            <button
              onClick={savePricingPage}
              disabled={isSaving}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Base Pricing Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Pricing Configuration</h2>
                  <p className="text-slate-300 text-sm">Set your standard rates</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Base Fare
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">£</span>
                    <input
                      className="border-2 border-slate-200 p-3 pl-8 w-full rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none font-medium"
                      type="number"
                      step="0.01"
                      value={data.baseFare.default}
                      onChange={(e) =>
                        setData({
                          ...data,
                          baseFare: {
                            ...data.baseFare,
                            default: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-xs text-slate-500">Starting price for all services</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Cost Per Mile
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">£</span>
                    <input
                      className="border-2 border-slate-200 p-3 pl-8 w-full rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none font-medium"
                      type="number"
                      step="0.01"
                      value={data.costPerMile}
                      onChange={(e) =>
                        setData({
                          ...data,
                          costPerMile: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <p className="text-xs text-slate-500">Charge per mile traveled</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Waiting Cost/Min
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">£</span>
                    <input
                      className="border-2 border-slate-200 p-3 pl-8 w-full rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none font-medium"
                      type="number"
                      step="0.01"
                      value={data.costPerMinuteWaiting}
                      onChange={(e) =>
                        setData({
                          ...data,
                          costPerMinuteWaiting: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <p className="text-xs text-slate-500">Rate per minute of waiting</p>
                </div>
              </div>
            </div>
          </section>

          {/* Surge Pricing Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Surge Pricing Rules</h2>
                  <p className="text-orange-100 text-sm">Adjust rates for high-demand periods</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Weekday Peak
                  </label>
                  <div className="relative">
                    <input
                      className="border-2 border-slate-200 p-3 pr-10 w-full rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none font-medium"
                      type="number"
                      value={data.surgeRules.weekdayPeakPercentage}
                      onChange={(e) =>
                        setData({
                          ...data,
                          surgeRules: {
                            ...data.surgeRules,
                            weekdayPeakPercentage: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                  </div>
                  <p className="text-xs text-slate-500">Monday - Friday surge</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Saturday Peak
                  </label>
                  <div className="relative">
                    <input
                      className="border-2 border-slate-200 p-3 pr-10 w-full rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none font-medium"
                      type="number"
                      value={data.surgeRules.saturdayPercentage}
                      onChange={(e) =>
                        setData({
                          ...data,
                          surgeRules: {
                            ...data.surgeRules,
                            saturdayPercentage: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                  </div>
                  <p className="text-xs text-slate-500">Saturday surge</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Sunday Peak
                  </label>
                  <div className="relative">
                    <input
                      className="border-2 border-slate-200 p-3 pr-10 w-full rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none font-medium"
                      type="number"
                      value={data.surgeRules.sundayPercentage}
                      onChange={(e) =>
                        setData({
                          ...data,
                          surgeRules: {
                            ...data.surgeRules,
                            sundayPercentage: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
                  </div>
                  <p className="text-xs text-slate-500">Sunday surge</p>
                </div>
              </div>
            </div>
          </section>

          {/* Peak Hours Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Peak Hours (24-hour format)</h2>
                  <p className="text-blue-100 text-sm">Define high-demand time periods</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Morning Peak */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Morning Peak Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Start Time</label>
                      <div className="relative">
                        <input
                          className="border-2 border-amber-300 bg-white p-3 pr-14 w-full rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none font-medium"
                          type="number"
                          min="0"
                          max="23"
                          value={data.peakHours.start}
                          onChange={(e) =>
                            setData({
                              ...data,
                              peakHours: {
                                ...data.peakHours,
                                start: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">:00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">End Time</label>
                      <div className="relative">
                        <input
                          className="border-2 border-amber-300 bg-white p-3 pr-14 w-full rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none font-medium"
                          type="number"
                          min="0"
                          max="23"
                          value={data.peakHours.end}
                          onChange={(e) =>
                            setData({
                              ...data,
                              peakHours: {
                                ...data.peakHours,
                                end: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evening Peak */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Evening Peak Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">Start Time</label>
                      <div className="relative">
                        <input
                          className="border-2 border-blue-300 bg-white p-3 pr-14 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-medium"
                          type="number"
                          min="0"
                          max="23"
                          value={data.peakHours.eveningStart}
                          onChange={(e) =>
                            setData({
                              ...data,
                              peakHours: {
                                ...data.peakHours,
                                eveningStart: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">:00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">End Time</label>
                      <div className="relative">
                        <input
                          className="border-2 border-blue-300 bg-white p-3 pr-14 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-medium"
                          type="number"
                          min="0"
                          max="23"
                          value={data.peakHours.eveningEnd}
                          onChange={(e) =>
                            setData({
                              ...data,
                              peakHours: {
                                ...data.peakHours,
                                eveningEnd: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="mt-6 bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-xl border border-slate-600">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Active Peak Hours Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <span className="text-amber-400 font-bold">Morning:</span>
                    <span className="text-white font-medium">
                      {String(data.peakHours.start).padStart(2, '0')}:00 - {String(data.peakHours.end).padStart(2, '0')}:00
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                    <span className="text-blue-400 font-bold">Evening:</span>
                    <span className="text-white font-medium">
                      {String(data.peakHours.eveningStart).padStart(2, '0')}:00 - {String(data.peakHours.eveningEnd).padStart(2, '0')}:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
   

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}