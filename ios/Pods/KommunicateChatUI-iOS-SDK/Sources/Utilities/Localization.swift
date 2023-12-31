//
//  Localization.swift
//  KommunicateChatUI-iOS-SDK
//
//  Created by Shivam Pokhriyal on 04/10/18.
//

import Foundation

protocol Localizable {
    static func localizedString(forKey: String) -> String
    func localizedString(forKey: String, withDefaultValue: String, fileName: String) -> String
}

extension Localizable {
    static func localizedString(forKey: String) -> String {
        //  bundle
        let bundle = Bundle.km

        return NSLocalizedString(forKey, tableName: nil, bundle: bundle, value: "", comment: "")
    }

    func localizedString(forKey: String, withDefaultValue: String, fileName: String) -> String {
        return NSLocalizedString(forKey, tableName: fileName, bundle: Bundle.main, value: withDefaultValue, comment: "")
    }
}
