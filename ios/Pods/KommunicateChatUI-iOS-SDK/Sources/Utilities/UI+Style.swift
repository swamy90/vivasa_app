//
//  UI+Style.swift
//  KommunicateChatUI-iOS-SDK
//
//  Created by Mukesh Thawani on 04/05/17.
//

import Foundation
import UIKit
#if canImport(RichMessageKit)
    import RichMessageKit
#endif
extension UIView {
    func setBackgroundColor(_ color: UIColor) {
        backgroundColor = color
    }

    func setTintColor(_ color: UIColor) {
        tintColor = color
    }
}

extension UINavigationBar {
    func setBarTinColor(_ color: UIColor) {
        barTintColor = color
    }
}

extension UITableView {
    func setSeparatorColor(_ color: UIColor) {
        separatorColor = color
    }
}

extension CALayer {
    func setBorderColor(_ color: UIColor) {
        borderColor = color.cgColor
    }

    func setBackgroundColor(_ color: UIColor) {
        backgroundColor = color.cgColor
    }
}

extension UILabel {
    func setTextColor(_ color: UIColor) {
        textColor = color
    }

    func setFont(_ font: UIFont) {
        self.font = font
    }
}

extension UITextView {
    func setStyle(_ style: Style) {
        setFont(style.font)
        setTextColor(style.text)
        setBackgroundColor(style.background)
    }

    func setTextColor(_ color: UIColor) {
        textColor = color
    }

    func setFont(_ font: UIFont) {
        self.font = font
    }

    func changeTextDirection() {
        var lang = textInputMode?.primaryLanguage
        if lang == nil {
            lang = UIApplication.sharedUIApplication()?.textInputMode?.primaryLanguage
        }
        // Still no language is detected then simply return
        guard let language = lang else { return }
        let isRTL = NSLocale.characterDirection(forLanguage: language) == .rightToLeft
        textAlignment = isRTL ? .right : .left
    }

    // For ALK ChatBar Place Holder
    func changePlaceHolderDirection() {
        let language = NSLocale.preferredLanguages[0]
        let direction = NSLocale.characterDirection(forLanguage: language)
        let isRTL = direction == NSLocale.LanguageDirection.rightToLeft
        textAlignment = isRTL ? .right : .left
    }
}

extension UITextField {
    func setStyle(_ style: Style) {
        setFont(style.font)
        setTextColor(style.text)
        setBackgroundColor(style.background)
    }

    func setTextColor(_ color: UIColor) {
        textColor = color
    }

    func setFont(_ font: UIFont) {
        self.font = font
    }
}

extension UIButton {
    func setStyle(style: Style, forState state: UIControl.State) {
        setFont(font: style.font)
        setTextColor(color: style.text, forState: state)
        setBackgroundColor(style.background)
    }

    func setTextColor(color: UIColor, forState state: UIControl.State) {
        setTitleColor(color, for: state)
    }

    func setFont(font: UIFont) {
        titleLabel?.font = font
    }
}
