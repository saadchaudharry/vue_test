import frappe
import json
from frappe.utils import today, add_to_date



@frappe.whitelist()
def get_available_learning():
    data = frappe.db.get_list('Alumni learning',fields=["day","image","title","url","description"])
    return data



@frappe.whitelist(api_path="function_name")
def your_function():
    # Your function code here
    return "Hello from shorter API path"