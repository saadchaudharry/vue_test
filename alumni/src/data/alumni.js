import { ref } from 'vue';
import { createResource } from 'frappe-ui';

const Alumni = createResource({
  url: 'frappe.client.get',
  params: { doctype: "Alumni" },
  onError(error) {
    console.error("Error fetching Alumni resource:", error);
  },
});

const aboutUsContent = ref(null);

const fetchAboutUsData = async () => {
  try {
    if (!Alumni.data) {
      await Alumni.fetch();
    }
    aboutUsContent.value = Alumni.data || null;
    return aboutUsContent.value;
  } catch (error) {
    console.error('Error fetching Alumni data:', error);
    return null;
  }
};

export default {
  fetchAboutUsData,
};
