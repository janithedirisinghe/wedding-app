"use client";

import { useState } from "react";
import TemplateOne from "../components/templateOne";

export default function MyWeb() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header Controls */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-neutral-300"></div>
              <h1 className="font-heading text-xl font-semibold text-neutral-800">
                Wedding Invitation Preview
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                    !isPreviewMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
                    isPreviewMode 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Preview
                </button>
              </div>
              
              <button className="btn-secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
              
              <button className="btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Invites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPreviewMode && (
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Customization Mode</h3>
                  <p className="text-blue-700 text-sm">
                    You can edit the content, colors, and layout of your invitation. 
                    Switch to Preview mode to see how it will look to your guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template Container */}
        <div className={`transition-all duration-300 ${
          isPreviewMode 
            ? 'max-w-4xl mx-auto' 
            : 'grid grid-cols-1 lg:grid-cols-4 gap-8'
        }`}>
          {/* Sidebar for Edit Mode */}
          {!isPreviewMode && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card-elegant">
                  <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-4">
                    Customize
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">Colors & Fonts</p>
                          <p className="text-sm text-neutral-600">Change theme</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">Text Content</p>
                          <p className="text-sm text-neutral-600">Edit wording</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">Images</p>
                          <p className="text-sm text-neutral-600">Upload photos</p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200 border border-neutral-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">Location</p>
                          <p className="text-sm text-neutral-600">Add venue details</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="card-elegant">
                  <h3 className="font-heading text-lg font-semibold text-neutral-800 mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full btn-secondary">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Save Draft
                    </button>
                    <button className="w-full btn-primary">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Template Display */}
          <div className={`${!isPreviewMode ? 'lg:col-span-3' : 'w-full'}`}>
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
              isPreviewMode ? 'mx-auto max-w-4xl' : ''
            }`}>
              <TemplateOne />
            </div>
          </div>
        </div>

        {/* Preview Mode Footer */}
        {isPreviewMode && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 bg-white rounded-lg p-4 shadow-lg">
              <span className="text-sm text-neutral-600">
                This is how your invitation will appear to guests
              </span>
              <button 
                onClick={() => setIsPreviewMode(false)}
                className="btn-secondary"
              >
                Continue Editing
              </button>
              <button className="btn-primary">
                Send to Guests
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
